import express, { Application, Request, Response, NextFunction } from "express";
import { secretAPIkey } from "../ssl/secretAPI";

function secretKeyMiddleware(req: Request, res: Response, next: NextFunction){
    const received_key = req.headers.secretkey;

    try {
        const secretkey = secretAPIkey();

        if (received_key == secretkey) {
            next();
        } else {
            res.json({ message: "fail", error: "wrong key"});

            return;
        }

    } catch (error) {
        res.json({ message: "fail", error});
    }
}

export { secretKeyMiddleware };