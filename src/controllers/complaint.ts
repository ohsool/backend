import express, { Request, Response} from "express";
import webhook, { WebClient, LogLevel } from "@slack/web-api";
import moment from "moment";

import { mailSender }  from '../email/mail'
import { env } from "../env";

import Complaints from "../schemas/complaint";
import Users from "../schemas/user"

import { IComplaint } from "../interfaces/complaint";
import { IMailInfo } from "../interfaces/mail";

const client = new WebClient(env.botUserOAuthToken, {
    logLevel: LogLevel.DEBUG
});

const postComplaint = async (req: Request, res: Response) => {
    const { title, description } = req.body;
    let nickname = res.locals.user.nickname ? res.locals.user.nickname : "Anonymous";
    const userId = res.locals.user._id;
    const email = res.locals.user.email

    if (!title || !description) {
        res.status(400).json({ message: "fail", error: "no title or descripton" });

        return;
    }
    if ( title.length > 100 || description.length > 500) {
        res.status(400).json({ message: "fail", error: "length too long" });

        return;
    }

    try {
        const result = await client.chat.postMessage({
            channel: "#불편사항",
            text: `*:person_frowning:${nickname} 님의 불편사항*
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

        const mailInfo: IMailInfo = {
            toEmail: email,     
            nickname: nickname, 
            type: 'complaint',   
        };

          // 성공 메일 보내기
        mailSender(mailInfo)

        res.status(201).json({ message: "success", result })
    } catch (error) {
        res.status(400).json({ message: "fail", error });
    }
};

// 불편사항 반영사항 메일 보내기
const sendFeedback = async (req: Request, res: Response) => {
    const complaintId = req.body.complaintId;
    const feedback: string = req.body.feedback;

    if (!feedback || feedback.length < 10) {
        res.status(400).json({ message: "fail", error: "no or too short feed back" });
            
        return;
    }

    try {
        const complaint = await Complaints.findById(complaintId);

        if (!complaint) {
            res.status(406).json({ message: "fail", error: "no exist complaint" });
            
            return;
        }

        const user = await Users.findById(complaint.userId);

        if (!user) {
            res.status(406).json({ meaasge: "fail", error: "no exist user" });

            return;
        }

        const email: string = user!.email!;
        const nickname: string = user!.nickname!;
        const complaint_title: string = complaint.title!;
        const complaint_description: string = complaint.description!;

        const mailInfo: IMailInfo = {
            toEmail: email,
            nickname: nickname,
            type: "complaintfeedback",
            feedback: feedback,
            complaint_title: complaint_title,
            complaint_description: complaint_description
        }

        mailSender(mailInfo);

        res.json({ message: "success" });
 
    } catch (error) {
        res.status(400).json({ message: "fail", error });
    }
}

export default {
    postComplaint,
    sendFeedback
}

// https://api.slack.com/apps/A029KN5LE84/oauth?