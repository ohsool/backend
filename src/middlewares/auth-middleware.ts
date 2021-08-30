import jwt from "jsonwebtoken";
import Users from "../schemas/user";

import { env } from "../env";
import { IUser } from "../interfaces/user";

import express, { Application, Request, Response, NextFunction } from "express";

function authMiddleware(req: Request, res: Response, next: NextFunction){
    const refreshToken1 = String(req.headers.dlfwh);
    const refreshToken2 = String(req.headers.ghkxld);
    const accessToken1 = String(req.headers.dhtnf);
    const accessToken2 = String(req.headers.chlrh);

    if (!refreshToken1 || !refreshToken2 || !accessToken1 || !accessToken2) {
        res.status(401).json({ message: "fail", error: "unidentified user" });

        return;
    }

    const refreshToken1Array = refreshToken1.split(" ");
    const refreshToken1Scheme = refreshToken1Array[0];
    const refreshToken1Value = refreshToken1Array[1];

    const refreshToken2Array = refreshToken2.split(" ");
    const refreshToken2Scheme = refreshToken2Array[0];
    const refreshToken2Value = refreshToken2Array[1];

    const accessToken1Array = accessToken1.split(" ");
    const accessToken1Scheme = accessToken1Array[0];
    const accessToken1Value = accessToken1Array[1];

    const accessToken2Array = accessToken2.split(" ");
    const accessToken2Scheme = accessToken2Array[0];
    const accessToken2Value = accessToken2Array[1];

    if (refreshToken1Scheme != "Bearer" || refreshToken2Scheme != "Bearer" || accessToken1Scheme != "Bearer" || accessToken2Scheme != "Bearer") {
        res.status(401).json({ message: "fail", error: "unidentified token schema" });

        return;
    }

    let refreshToken = refreshToken1Value + refreshToken2Value;
    let accessToken = accessToken1Value + accessToken2Value;

    let userRefreshVerified;
    let userAccessVerified;

    try {
        userRefreshVerified = jwt.verify(refreshToken, env.jwt_secret);
    } catch (error) {
        userRefreshVerified = null;
    }

    try {
        userAccessVerified = jwt.verify(accessToken, env.jwt_secret);
    } catch (error) {
        userAccessVerified = null;
    }

    try {
        if (!userAccessVerified) {
            if (!userRefreshVerified) { 
                // 1. access token, refresh token are all expired
                // : gives error
                // console.log("1. access token, refresh token are all expired");

                if ( refreshToken == "undefined" && accessToken == "undefined" ) {
                    res.status(401).json({ message: "fail", error: "not logged in" });

                    return;
                } else {
                    res.status(401).json({ message: "fail", error: "all tokens are expired" });

                    return;
                }
            } else {  
                // 2. refresh token is valid but access token is expired
                // : reissue access token
                // console.log("2. refresh token is valid but access token is expired");

                Users.findOne({ refreshToken })
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

                            const accessToken1 = accessToken.split(".")[0];
                            const accessToken2 = "." + accessToken.split(".")[1] + "." + accessToken.split(".")[2];

                            res.status(418).json({ message: "fail", error: "I'm a teapot", dhtnf: accessToken1, chlrh: accessToken2 });

                            return;
                        }
                    }).catch((error: object) => {
                        res.status(401).json({ message: "fail", error});

                        return;
                    })
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

                                    refreshToken = String(refreshToken);

                                    const refreshToken1 = refreshToken.split(".")[0];
                                    const refreshToken2 = "." + refreshToken.split(".")[1] + "." + refreshToken.split(".")[2];

                                    res.status(418).json({ message: "fail", error: "I'm a teapot", dlfwh: refreshToken1, ghkxld: refreshToken2 });

                                    return;
                                })
                            
                        } else {
                            res.status(401).json({ message: "fail", error: "no exist user" });

                            return;
                        }
                        
                    }).catch((error: object) => {
                        res.status(401).json({ message: "fail", error});

                        return;
                    }
                );

            } else {
                // 4. all are valid
                // : to next middleware
                // console.log("4. all are valid");

                const userId = (<any>userAccessVerified).userId;
                if (!userId || (<any>userRefreshVerified).userId) {
                    res.status(401).json({ message: "fail", error: "wrong tokens" });

                    return;
                }

                Users.findOne({ _id: userId })
                    .then((user: IUser | null) => {
                        if (user) {
                            if (user.refreshToken != refreshToken) {
                                res.status(401).json({ message: "fail", error: "wrong tokens" });

                                return;
                            }

                            res.locals.user = user;

                            next();

                            return;
                        } else {
                            res.status(401).json({ message: "fail", error: "no exist user" });

                            return;
                        }
                        
                    }).catch((error: object) => {
                        res.status(401).json({ message: "fail", error});

                        return;
                    }
                );
            }
        }
    } catch (error) {
        res.status(401).json({ message: "fail", error});
    }
}

export { authMiddleware };