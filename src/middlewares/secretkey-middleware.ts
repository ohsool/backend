import express, { Application, Request, Response, NextFunction } from "express";
import { secretAPIkey } from "../ssl/secretAPI";

function secretKeyMiddleware(req: Request, res: Response, next: NextFunction){
    const received_key = req.headers.secretkey;

    try {
        const secretkey = secretAPIkey();

        console.log(received_key, secretkey);

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