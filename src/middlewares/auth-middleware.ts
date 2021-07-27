import jwt from "jsonwebtoken";
import Users from "../schemas/user";

import express, { Application, Request, Response, NextFunction } from "express";

function authMiddleware(req: Request, res: Response, next: NextFunction){
    const { authorization } = req.headers;

    try {
        if (!authorization) {
            res.status(401).json({ message: "unidentified user" });

            return;
        }

        const tokenArray = authorization.split(" ");
        const tokenScheme = tokenArray[0];
        const tokenValue = tokenArray[1];

        if (tokenScheme != "Bearer") {
            res.status(401).json({ message: "unidentified token schema" });

            return;
        }

        const user = jwt.verify(tokenValue, "bananatulip");
        const userId = (<any>user).userId;

        Users.findOne({ _id: userId })
            .then((result: object) => {
                res.locals.user = result;

                next();
            }).catch((err: object) => {
                res.status(401).json({ message: "fail", err});
            });

    } catch (err) {
        res.status(401).json({ message: "fail", err});
    }
}

export { authMiddleware };