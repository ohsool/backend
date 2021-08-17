import express, { Request, Response} from "express";
import webhook, { WebClient, LogLevel } from "@slack/web-api";
import { env } from "../env";

const client = new WebClient(env.botUserOAuthToken, {
    logLevel: LogLevel.DEBUG
});

const postRecommendation = async (req: Request, res: Response) => {
    let { beer, description, location, image } = req.body;
    let nickname = res.locals.user.nickname;

    if (!beer || !description) {
        res.json({ message: "fail", error: "no beer or descripton" })

        return;
    }

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
            *판매처:* ${location}
            *이미지:* ${image}
            `,
            username: "recommendationbot", 
            icon_emoji: ":beer:"
        })

        res.json({ message: "success", result })
    } catch (error) {
        res.json({ message: "fail", error });
    }
};

export default {
    postRecommendation
}