import express, { Request, Response, NextFunction, Router, response } from "express";
import webhook, { WebClient, LogLevel } from "@slack/web-api";

import { authMiddleware } from "../middlewares/auth-middleware";

const client = new WebClient("xoxb-2304718692502-2319759042067-vKLTaKEX7ilriuklZDpYDYEP", {
    logLevel: LogLevel.DEBUG
});

const recommendationRouter = express.Router();

recommendationRouter.post("/", authMiddleware, async (req, res) => {
    let { beer, description, location } = req.body;
    let nickname = res.locals.user.nickname;

    if (!nickname) {
        nickname = "Anonymous";
    }
    if (!location) {
        location = "Unknown";
    }

    try {
        const result = await client.chat.postMessage({
            channel: "#맥주추천",
            text: `*:beers:${nickname} 님의 맥주추천*
            *맥주 이름:* ${beer}
            *내용:* ${description}
            *판매처:* ${location}`,
            username: "recommendationbot", 
            icon_emoji: ":beer:"
        })

        res.json({ message: "success", result })
    } catch (err) {
        res.json({ message: "fail", err });
    }
})

export { recommendationRouter };

/*
removed an integration from this channel: beer bot

https://api.slack.com/apps/A029KN5LE84
OAuth & Permissions
- https://api.slack.com/apps/A029KN5LE84/incoming-webhooks? 등록
- Token check
- Scope check
*/