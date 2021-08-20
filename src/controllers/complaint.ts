import express, { Request, Response} from "express";
import webhook, { WebClient, LogLevel } from "@slack/web-api";
import moment from "moment";

import { env } from "../env";

import Complaints from "../schemas/complaint";

const client = new WebClient(env.botUserOAuthToken, {
    logLevel: LogLevel.DEBUG
});

const postComplaint = async (req: Request, res: Response) => {
    const { title, description } = req.body;
    let nickname = res.locals.user.nickname;
    const userId = res.locals.user._id;

    if (!title || !description) {
        res.json({ message: "fail", error: "no title or descripton" });

        return;
    }

    try {
        const result = await client.chat.postMessage({
            channel: "#불편사항",
            text: `*:person_frowning:${nickname ? nickname : "Anonymous"} 님의 불편사항*
            *제목:* ${title}
            *내용:* ${description}`,
            username: "complaintbot", 
            icon_emoji: ":imp:"
        });

        const date = moment().format("YYYY-MM-DD hh:mm A");

        if (userId) {
            await Complaints.create({ title, description, userId, date });
        } else {
            await Complaints.create({ title, description, date });
        }

        res.json({ message: "success", result })
    } catch (error) {
        res.json({ message: "fail", error });
    }
};

export default {
    postComplaint
}