import jwt from "jsonwebtoken";
import Users from "../schemas/user";

import { env } from "../env";
import { IUser } from "../interfaces/user";

import express, { Application, Request, Response, NextFunction } from "express";

function authMiddleware(req: Request, res: Response, next: NextFunction){
    let refreshToken = req.headers.refresh;
    let accessToken = req.headers.access;

    if (!accessToken || !refreshToken) {
        res.status(401).json({ message: "fail", error: "unidentified user" });

        return;
    }

    const refreshTokenArray = (<String>refreshToken).split(" ");
    const refreshTokenScheme = refreshTokenArray[0];
    const refreshTokenValue = refreshTokenArray[1];

    const accessTokenArray = (<String>accessToken).split(" ");
    const accessTokenScheme = accessTokenArray[0];
    const accessTokenValue = accessTokenArray[1];

    if (refreshTokenScheme != "Bearer" || accessTokenScheme != "Bearer") {
        res.status(401).json({ message: "fail", error: "unidentified token schema" });

        return;
    }

    let userRefreshVerified;
    let userAccessVerified

    try {
        userRefreshVerified = jwt.verify(refreshTokenValue, env.jwt_secret);
    } catch (error) {
        userRefreshVerified = null;
    }

    try {
        userAccessVerified = jwt.verify(accessTokenValue, env.jwt_secret);
    } catch (error) {
        userAccessVerified = null;
    }
    
    try {
        if (!userAccessVerified) {
            if (!userRefreshVerified) { 
                // 1. access token, refresh token are all expired
                // : gives error
                // console.log("1. access token, refresh token are all expired");

                if ( refreshTokenValue == "undefined" && accessTokenValue == "undefined" ) {
                    res.json({ message: "fail", error: "not logged in" });

                    return;
                } else {
                    res.status(401).json({ message: "fail", error: "all tokens are expired" });

                    return;
                }
            } else {  
                // 2. refresh token is valid but access token is expired
                // : reissue access token
                // console.log("2. refresh token is valid but access token is expired");

                Users.findOne({ refreshToken: refreshTokenValue })
                    .then(( user: IUser | null ) => {
                        if (user) {
                            accessToken = jwt.sign({ userId: user._id }, 
                                env.jwt_secret, {
                                  expiresIn: '1h',
                                  issuer: 'node-avengers'
                                }
                            );

                            // res.locals.user = user;
                            // res.locals.accessToken = accessToken;

                            // next();

                            res.status(401).json({ message: "fail", error: "access token is expired" });

                            return;
                        }
                    }).catch((error: object) => {
                        res.status(401).json({ message: "fail", error});
                    }
                )
            }
            
        } else {
            if (!userRefreshVerified) {
                // 3. access token is valid but refresh token is expired
                // : reissue refresh token
                // console.log("3. access token is valid but refresh token is expired");

                let userId = (<any>userAccessVerified).userId;

                Users.findOne({ _id: userId })
                    .then((user: IUser | null) => {
                        if (user) {
                            refreshToken = jwt.sign( {}, 
                                env.jwt_secret, { 
                                  expiresIn: '14d', 
                                  issuer: 'node-avengers' 
                                }
                            );

                            Users.findOneAndUpdate({ _id: userId }, {$set: {refreshToken}})
                                .then((user: IUser | null) => {
                                    // res.locals.user = user;
                                    // res.locals.refreshToken = refreshToken;

                                    // next();

                                    res.status(401).json({ message: "fail", error: "refresh token is expired" });

                                    return;
                                })
                            
                        } else {
                            res.status(401).json({ message: "fail", error: "no exist user" });
                        }
                        
                    }).catch((error: object) => {
                        res.status(401).json({ message: "fail", error});
                    }
                );

            } else {
                // 4. all are valid
                // : to next middleware
                // console.log("4. all are valid");

                let userId = (<any>userAccessVerified).userId;

                Users.findOne({ _id: userId })
                    .then((user: IUser | null) => {
                        if (user) {
                            res.locals.user = user;

                            next();
                        } else {
                            res.status(401).json({ message: "fail", error: "no exist user" });
                        }
                        
                    }).catch((error: object) => {
                        res.status(401).json({ message: "fail", error});
                    }
                );
            }
        }
    } catch (error) {
        res.status(401).json({ message: "fail", error});
    }
}

export { authMiddleware };