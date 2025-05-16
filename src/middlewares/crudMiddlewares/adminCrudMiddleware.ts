import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import * as session from 'express-session';
import { tokenSecretKey } from '../../domains/user/authentication/authService.js';
import { userAuthLogSchemaExport } from '../../domains/user/authentication/authModel.js';
import { userRolesSchemaExport } from '../../domains/user/usercrud/userModel.js';


const adminCrudMiddleware = (requiredRole: string[]) => {
    return async (req:Request,res:Response,next:NextFunction): Promise<any> => {
        const token = req.headers['authorization'];
        const authLog = userAuthLogSchemaExport;
        const userRoles = userRolesSchemaExport;
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
                        
    
                        if (getLoggedUserData !== undefined && getLoggedUserData !== null && getLoggedUserData.token !== req.headers['authorization'])
                            return res.status(401).json({ error: 'Access denied.1' });
    
                        if(getLoggedUserData && getLoggedUserData.username !== req.session.username)
                            return res.status(401).json({ error: 'Access denied.2' });
                        
                        
                        if(getLoggedUserData && getLoggedUserData.username){
                            const userRolesData = await userRoles.findOne({username: getLoggedUserData.username});
                            
                            
                            if (userRolesData && userRolesData.roles) {
                                let permissionControl:boolean=false;

                                userRolesData.roles.forEach(element => {
                                    if (requiredRole.includes(element)) {
                                        console.log(element);
                                        console.log(element);
                                        console.log(element);
                                        console.log(element);
                                        console.log(element);
                                        console.log(element);
                                        
                                        permissionControl = true;
                                    }
                                });

                                if (userRolesData.roles.includes('admin')) {
                                    permissionControl=true;
                                    next();
                                }
                                
                                if (!permissionControl)
                                    return res.status(401).json({ error: 'Access denied.3admin' });
                                    

                                
                                
                            } else {
                                await new userRoles({username: req.session.username, roles: ['user']}).save();

                                next();
                                
                            }
                            
                        } else {
                            return res.status(401).json({ error: 'Access denied.4admin' });
                        }

                        
                    } else
                    return res.status(401).json({ error: 'Access denied.5' });
                });
            } else
                return res.status(401).json({ error: 'Access denied.6' });
            
            
    
        } catch (error) {
            console.log(error);
            return res.status(401).json({ error: 'Access denied.7' });
        }
    }
}

export default adminCrudMiddleware;