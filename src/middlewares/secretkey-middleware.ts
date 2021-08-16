import express, { Application, Request, Response, NextFunction } from "express";
import { secretAPIkey } from "../ssl/secretAPI";
import { env } from "../env";

function secretKeyMiddleware(req: Request, res: Response, next: NextFunction){

    // 테스트 모드일 경우 시크릿 키 확인하지 않고 그냥 스킵
    if (env.modeNow === "test") {
        next();
        return;
    }
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
