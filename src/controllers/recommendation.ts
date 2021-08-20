import express, { Request, Response} from "express";
import webhook, { WebClient, LogLevel } from "@slack/web-api";
import moment from "moment";

import { mailSender }  from '../email/mail'
import { env } from "../env";
import Recommendations from "../schemas/recommendation";

const client = new WebClient(env.botUserOAuthToken, {
    logLevel: LogLevel.DEBUG
});

const postRecommendation = async (req: Request, res: Response) => {
    let { beer, description, image } = req.body;
    let nickname = res.locals.user.nickname;
    const userId = res.locals.user._id;

    if (!beer || !description) {
        res.json({ message: "fail", error: "no beer or descripton" })

        return;
    }

    try {
        const result = await client.chat.postMessage({
            channel: "#맥주추천",
            text: `*:beers:${nickname ? nickname : "Anonymous"} 님의 맥주추천*
            *맥주 이름:* ${beer}
            *내용:* ${description}
            *이미지:* ${image}
            `,
            username: "recommendationbot", 
            icon_emoji: ":beer:"
        })

        const date = moment().format("YYYY-MM-DD hh:mm A");

        if (userId) {
            await Recommendations.create({ beer, description, image, userId, date })
        } else {
            await Recommendations.create({ beer, description, image, date })
        }

        res.json({ message: "success", result })
    } catch (error) {
        res.json({ message: "fail", error });
    }
};

export default {
    postRecommendation
}