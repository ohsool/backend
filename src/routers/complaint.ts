import express, { Request, Response, NextFunction, Router, response } from "express";
import webhook, { WebClient, LogLevel } from "@slack/web-api";

import { authMiddleware } from "../middlewares/auth-middleware";

const client = new WebClient("xoxb-2304718692502-2319759042067-myErZsAzBXWwIgm4N6vUm2fG", {
    logLevel: LogLevel.DEBUG
});

const complaintRouter = express.Router();

complaintRouter.post("/", authMiddleware, async (req, res) => {
    const { title, description } = req.body;
    let nickname = res.locals.user.nickname;

    if (!nickname) {
        nickname = "Anonymous";
    }

    try {
        const result = await client.chat.postMessage({
            channel: "#불편사항",
            text: `*:person_frowning:${nickname} 님의 불편사항*
            *제목:* ${title}
            *내용:* ${description}`,
            username: "complaintbot", 
            icon_emoji: ":imp:"
        })

        res.json({ message: "success", result })
    } catch (err) {
        res.json({ message: "fail", err });
    }
})

export { complaintRouter };