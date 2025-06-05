import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import * as session from 'express-session';
import { tokenSecretKey } from '../../domains/user/authentication/authService.js';
import { userAuthLogSchemaExport } from '../../domains/user/authentication/authModel.js';


const authCrudMiddleware = (requiredRole: string[]) => {
    return async (req:Request,res:Response,next:NextFunction): Promise<any> => {
        const token = req.headers['authorization'];
        const authLog = userAuthLogSchemaExport
        let getLoggedUserData = undefined;
        
        try {
            if (token !== undefined && token !== null && tokenSecretKey && req.headers['authorization'] !== undefined && req.headers['authorization'] !== null) {
                jwt.verify(req.headers['authorization'], tokenSecretKey, async (err:any, token:any) => {
                    if (!req.session) {
                        return res.status(500).json({ error: 'Session is not initialized' });
                    }
                    if (err) {return res.status(401).json({error:'Session has expired.'});}
                    
                    if (req.session.username && req.session.username !== null && req.session.username !== undefined) {
                        getLoggedUserData = await authLog.findOne({ username: token.username });
                        if (getLoggedUserData !== undefined && getLoggedUserData !== null && getLoggedUserData.token !== req.headers['authorization']) {
                            return res.status(401).json({ error: 'Access denied.1' });
                        }
                        if(getLoggedUserData && getLoggedUserData.username !== req.session.username)
                            return res.status(401).json({ error: 'Access denied.2' });
                        else
                        next();
                    } else return res.status(401).json({ error: 'Access denied.3' });
                });
            } else if(requiredRole.includes('visitor')) {next()}  else return res.status(401).json({ error: 'Access denied.4' });
        } catch (error) {
            return res.status(401).json({ error: 'Access denied.5' });
        }
    }
}

export default authCrudMiddleware;