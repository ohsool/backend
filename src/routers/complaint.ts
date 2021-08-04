import express, { Request, Response, NextFunction, Router, response } from "express";
import webhook, { WebClient, LogLevel } from "@slack/web-api";

import { authMiddleware } from "../middlewares/auth-middleware";
import { env } from "../env";

const client = new WebClient(env.botUserOAuthToken, {
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
    } catch (error) {
        res.json({ message: "fail", error });
    }
})

export { complaintRouter };


/*
removed an integration from this channel: beer bot

https://api.slack.com/apps/A029KN5LE84
OAuth & Permissions
- Token check
- Scope check
*/
