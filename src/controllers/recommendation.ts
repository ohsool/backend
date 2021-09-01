import express, { Request, Response } from "express";
import webhook, { WebClient, LogLevel } from "@slack/web-api";
import moment from "moment";
// import request from "request";

import { mailSender } from "../email/mail";
import { env } from "../env";

import Recommendations from "../schemas/recommendation";
import Users from "../schemas/user";
import Beers from "../schemas/beer";

import { IRecommendation } from "../interfaces/recommendation";
import { IMailInfo } from "../interfaces/mail";

// 슬랙 봇 설정
const client = new WebClient(env.botUserOAuthToken, {
  logLevel: LogLevel.DEBUG,
});

// 슬랙을 통해 맥주 추천 전달하기
const postRecommendation = async (req: Request, res: Response) => {
  let { beer, description, image } = req.body;
  let nickname = res.locals.user.nickname
    ? res.locals.user.nickname
    : "Anonymous";
  const userId = res.locals.user._id;
  const email = res.locals.user.email;

  if (!beer || !description) {
    res.status(400).json({ message: "fail", error: "no beer or descripton" });

    return;
  }
  if (beer.length > 100 || description.length > 500) {
    res.status(400).json({ message: "fail", error: "length too long" });

    return;
  }

  try {
    // 슬랙 맥주추천 채널에 업로드
    const result = await client.chat.postMessage({
      channel: "#맥주추천",
      text: `*:beers:${nickname} 님의 맥주추천*
            *맥주 이름:* ${beer}
            *내용:* ${description}
            *이미지:* ${image}
            `,
      username: "recommendationbot",
      icon_emoji: ":beer:",
    });

    const date = moment().format("YYYY-MM-DD hh:mm A");

    if (userId) {
      const recommendation: IRecommendation = {
        beer,
        description,
        image,
        userId,
        date,
      };

      await Recommendations.create(recommendation);
    } else {
      const recommendation: IRecommendation = {
        beer,
        description,
        image,
        date,
      };

      await Recommendations.create(recommendation);
    }

    const mailInfo: IMailInfo = {
      toEmail: email,
      nickname: nickname,
      type: "recommendation",
      beer: beer,
    };

    // 성공 메일 보내기
    mailSender(mailInfo);

    res.status(201).json({ message: "success", result });
  } catch (error) {
    res.status(400).json({ message: "fail", error });
  }
};

// 맥주 추천 반영사항 메일 보내기
const sendFeedback = async (req: Request, res: Response) => {
  const recommendationId = req.body.recommendationId;
  const beerId = req.body.beerId;

  try {
    const recommendation = await Recommendations.findById(recommendationId);

    if (!recommendation) {
      res
        .status(406)
        .json({ message: "fail", error: "no exist recommendation" });

      return;
    }

    const user = await Users.findById(recommendation.userId);

    if (!user) {
      res.status(406).json({ meaasge: "fail", error: "no exist user" });

      return;
    }

    const email: string = user!.email!;
    const nickname: string = user!.nickname!;
    const beer = await Beers.findById(beerId);

    if (!beer) {
      res.status(406).json({ message: "fail", error: "no exist beer" });

      return;
    }

    // 맥주 추천에 관한 피드백을 해당 유저의 메일로 전송
    const mailInfo: IMailInfo = {
      toEmail: email,
      nickname: nickname,
      type: "beerfeedback",
      beer: beer.name_korean,
      beerId: beerId,
    };

    // 성공 메일 보내기
    mailSender(mailInfo);

    await Recommendations.findByIdAndUpdate(recommendationId, {
      $set: { isSolved: true },
    });

    res.json({ message: "success" });
  } catch (error) {
    res.status(400).json({ message: "fail", error });
  }
};

export default {
  postRecommendation,
  sendFeedback,
};

// https://api.slack.com/apps/A029KN5LE84/oauth?
