import express, { Request, Response} from "express";
import webhook, { WebClient, LogLevel } from "@slack/web-api";
import moment from "moment";

import { mailSender }  from '../email/mail'
import { env } from "../env";

import Complaints from "../schemas/complaint";
import { IComplaint } from "../interfaces/complaint";

const client = new WebClient(env.botUserOAuthToken, {
    logLevel: LogLevel.DEBUG
});

const postComplaint = async (req: Request, res: Response) => {
    const { title, description } = req.body;
    let nickname = res.locals.user.nickname;
    const userId = res.locals.user._id;
    const email = res.locals.user.email

    if (!title || !description) {
        res.json({ message: "fail", error: "no title or descripton" });

        return;
    }
    if ( title.length > 100 || description.length > 500) {
        res.json({ message: "fail", error: "length too long" });

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
            const complaint: IComplaint = {
                title, description, userId, date
            }
            await Complaints.create(complaint);
        } else {
            const complaint: IComplaint = {
                title, description, date
            }
            await Complaints.create(complaint);
        }

        // const mailInfo = {
        //     toEmail: email,    
        //     nickname: nickname,
        //     subject: '안녕하세욧'
        // };

        // mailSender(mailInfo)

        res.json({ message: "success", result })
    } catch (error) {
        res.json({ message: "fail", error });
    }
};

export default {
    postComplaint
}

// https://api.slack.com/apps/A029KN5LE84/oauth?