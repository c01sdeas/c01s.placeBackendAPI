import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import * as session from 'express-session';
import { tokenSecretKey } from '../../domains/user/authentication/authService.js';
import { userAuthLogSchemaExport } from '../../domains/user/authentication/authModel.js';
import { userRolesSchemaExport } from '../../domains/user/usercrud/userModel.js';


const userCrudMiddleware = (requiredRole: string[]) => {
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
                            return res.status(401).json({ error: 'Access denied.' });
    
                        if(getLoggedUserData && getLoggedUserData.username !== req.session.username)
                            return res.status(401).json({ error: 'Access denied.' });
                        
                        
                        if(getLoggedUserData && getLoggedUserData.username){
                            const userRolesData = await userRoles.findOne({username: getLoggedUserData.username});
                            console.log(userRolesData);
                            console.log(requiredRole);
                            
                            
                            if (userRolesData && userRolesData.roles) {
                                // userRolesData.roles.forEach(element => {
                                //     if (requiredRole.includes(element)) {
                                //         next();
                                //     }
                                // });

                                 let permissionControl:boolean=false;
                                userRolesData.roles.forEach(element => {
                                    if (requiredRole.includes(element)) {
                                        if (element === 'user' && req.body.username === req.session.username){
                                            permissionControl=true;
                                        }
                                        else if (userRolesData.roles.includes('admin') || userRolesData.roles.includes('moderator')){
                                            permissionControl=true;
                                        }
                                            
                                        else
                                            return res.status(401).json({ error: 'Access denied.4' });
                                    }
                                });
                                
                                if(!permissionControl)
                                    return res.status(401).json({ error: 'Access denied.3' });
                                else
                                    next();
                                

                                // if (requiredRole.includes('user') && userRolesData.roles.includes('user') && req.body.username === req.session.username) 
                                //     next();
                                // else if (userRolesData.roles.includes('admin') ||    userRolesData.roles.includes('moderator'))
                                //         next();
                                // else 
                                //     return res.status(401).json({ error: 'Access denied.' });
                                

                                
                                
                            } else {
                                await new userRoles({username: req.session.username, roles: ['user']}).save();

                                next();
                                
                            }
                            
                        } else {
                            return res.status(401).json({ error: 'Access denied.' });
                        }

                        
                    } else
                    return res.status(401).json({ error: 'Access denied.' });
                });
            } else
                return res.status(401).json({ error: 'Access denied.' });
            
            
    
        } catch (error) {
            console.log(error);
            return res.status(401).json({ error: 'Access denied.' });
        }
    }
}

export default userCrudMiddleware;