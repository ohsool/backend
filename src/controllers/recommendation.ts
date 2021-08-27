import express, { Request, Response} from "express";
import webhook, { WebClient, LogLevel } from "@slack/web-api";
import moment from "moment";
// import request from "request";

import { mailSender }  from '../email/mail'
import { env } from "../env";
import Recommendations from "../schemas/recommendation";
import { IRecommendation } from "../interfaces/recommendation";

const client = new WebClient(env.botUserOAuthToken, {
    logLevel: LogLevel.DEBUG
});

const postRecommendation = async (req: Request, res: Response) => {
    let { beer, description, image } = req.body;
    let nickname = res.locals.user.nickname ? res.locals.user.nickname : "Anonymous";
    const userId = res.locals.user._id;
    const email = res.locals.user.email

    if (!beer || !description) {
        res.json({ message: "fail", error: "no beer or descripton" })

        return;
    }
    if ( beer.length > 100 || description.length > 500) {
        res.json({ message: "fail", error: "length too long" });

        return;
    }

    try {
        const result = await client.chat.postMessage({
            channel: "#맥주추천",
            text: `*:beers:${nickname} 님의 맥주추천*
            *맥주 이름:* ${beer}
            *내용:* ${description}
            *이미지:* ${image}
            `,
            username: "recommendationbot", 
            icon_emoji: ":beer:"
        })

        const date = moment().format("YYYY-MM-DD hh:mm A");

        if (userId) {
            const recommendation: IRecommendation = {
                beer, description, image, userId, date
            };

            await Recommendations.create(recommendation);
        } else {
            const recommendation: IRecommendation = { 
                beer, description, image, date
            };

            await Recommendations.create(recommendation);
        }

        
        const mailInfo = {
            toEmail: email,     
            nickname: nickname, 
            type: 'recommendation',   
        };

          // 성공 메일 보내기
        mailSender(mailInfo)

        res.json({ message: "success", result })
    } catch (error) {
        res.json({ message: "fail", error });
    }
};

// const test = async (req: Request, res: Response) => {
//     const apiKey = "051c1b730a72fbb7ffe1ef26aac8878a";
//     const city = "Gwangju, KR";
//     const lat = "";
//     const lon = "";
//     const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

//     request(url, (error, response, body) => {
//         if (!error) {
//             console.log(body);

//             res.json({ message: "success", body });
//         } else {
//             console.log(error)

//             res.json({ message: "fail", error });
//         }
//     });
// }

export default {
    postRecommendation,
    // test
}

// https://api.slack.com/apps/A029KN5LE84/oauth?