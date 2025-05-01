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
            // if (token === undefined || token === null) return res.status(401).json({ error: 'Access denied.' });
    
            if (token !== undefined && token !== null && tokenSecretKey && req.headers['authorization'] !== undefined && req.headers['authorization'] !== null) {
                jwt.verify(req.headers['authorization'], tokenSecretKey, async (err:any, token:any) => {
    
                    if (!req.session) {
                        return res.status(500).json({ error: 'Session is not initialized' });
                      }
                      // username özelliği olup olmadığını kontrol et
                    // if (!req.session.username) {
                    //     req.session.username = 'your-username'; // Varsayılan olarak ata
                    // }
                    if (err) {return res.status(401).json({error:'Session has expired.'});}
        
                    // console.log(req.session);
        
                    // // req.session.username = 'your-username';
                    
                    // console.log(req.session.username);
                    
                    if (req.session.username) {
                        getLoggedUserData = await authLog.findOne({ username: token.username });
    
                        if (getLoggedUserData !== undefined && getLoggedUserData !== null && getLoggedUserData.token !== req.headers['authorization']) {
                            console.log('Access denied. By local token.');
                            return res.status(401).json({ error: 'Access denied.' });
                        }
    
                        if(getLoggedUserData && getLoggedUserData.username !== req.session.username)
                            return res.status(401).json({ error: 'Access denied.' });
                        else
                        next();
                    } else
                    return res.status(401).json({ error: 'Access denied.' });
                });
            } else if(requiredRole.includes('visitor')) {console.log('visitor rolü var'); next()}  else {
                return res.status(401).json({ error: 'Access denied.' });
            }
            
            
    
        } catch (error) {
            console.log(error);
            return res.status(401).json({ error: 'Access denied.' });
        }
    }
}

export default authCrudMiddleware;