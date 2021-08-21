import express, { Request, Response, NextFunction, Router } from "express";
import passport from "passport";
import joi from "joi";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import mongoose from "mongoose";

import Beers from "../schemas/beer";
import BeerCategories from "../schemas/beerCategory";
import Users from "../schemas/user";
import MyBeers from "../schemas/mybeer";

import { mailSender }  from '../email/mail'

import { env } from "../env";

const joiSchema = joi.object({
    email: joi
      .string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    nickname: joi.string().min(1).max(30).required(),
    password: joi.string().min(4).pattern(new RegExp("^[a-zA-Z0-9]{4,30}$")),
    confirmPassword: joi.ref("password")
  });
  // id 포함 안하게

  type ImageArray = {
    [index: string]: string,
    Lager: string,
    Pilsner: string,
    Ale: string,
    IPA: string,
    Weizen: string,
    Dunkel: string,
    Stout: string,
    Bock: string,
    Etc: string
  }

  const imagesArray: ImageArray = {
    Lager: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerIcon/Lager.png",
    Pilsner: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerIcon/Pilsner.png",
    Ale: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerIcon/Ale.png",
    IPA: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerIcon/IPA.png",
    Weizen: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerIcon/Weizen.png",
    Dunkel: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerIcon/Dunkel.png",
    Stout: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerIcon/Stout.png",
    Bock: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerIcon/Bock.png",
    Etc: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerIcon/Etc.png"
  }

const existedEmail = async(req: Request, res: Response) => {
    const { email } = req.body;
    const test_emails = [
      "mybeertest@test.com", 
      "anothermybeertest@test.com", 
      "recommendationtest@test.com",
      "usertest@test.com"
    ]

    if (!email) {
      res.json({ message: "fail", error: "no input" });

      return
    }

    if ( test_emails.includes(email) ) {
      res.json({ message: "fail", error: "email for test. don't use this" });

      return
    }

    try {
      const existedUser = await Users.findOne({ email }).lean();

      if (existedUser) {
        res.json({ message: "success", existed: true });
      } else {
        res.json({ message: "success", existed: false });
      }
    } catch (error) {
      res.json({ message: "fail", error });
    }
}

const existedNickname = async(req: Request, res: Response) => {
    const { nickname } = req.body;

    if (!nickname) {
      res.json({ message: "fail", error: "no input" });

      return
    }

    try {
      const existedUser = await Users.findOne({ nickname }).lean();

      if (existedUser) {
        res.json({ message: "success", existed: true });
      } else {
        res.json({ message: "success", existed: false });
      }
    } catch (error) {
      res.json({ message: "fail", error });
    }
}

const register = async(req: Request, res: Response) => {
    const { email, nickname, password, confirmPassword } = req.body;
    
      try {
        const existUser1 = await Users.findOne({ nickname }).lean();
        const existUser2 = await Users.findOne({ email }).lean();

        if (existUser1 || existUser2) {
            res.json({ message: "fail", error: "existed user" });
  
            return;
        }
      } catch(error) {
          res.json({ message: "fail", error });
      }

      const { value, error } = joiSchema.validate({
        email, nickname, password, confirmPassword
      });

      if (!error) {
          const crypted_password = crypto.createHmac("sha256", password).update(env.pass_secret).digest("hex");

          await Users.create({ email, nickname, password: crypted_password });

          const mailInfo = {
            toEmail: email,     // 수신할 이메일
            nickname: nickname, //
            subject: 'Welcome to ohsool',   // 메일 제목              // 메일 내용
          };

          // 성공 메일 보내기
          mailSender(mailInfo)

          res.status(201).json({ message: "success" });
      } else {
          res.json({ message: "fail", error: error.details[0].message });
      }
}

const login = async(req: Request, res: Response) => {
    let { email, password } = req.body;

    const crypted_password = crypto.createHmac("sha256", password).update(env.pass_secret).digest("hex");
    try {
      const user = await Users.findOne({ email }).lean();

      if (!user) {
        res.status(401).json({ message: "fail", error: "wrong user" });
  
        return;
      }

      if (user.password != crypted_password) {
        res.status(401).json({ message: "fail", error: "wrong password" });
  
        return;
      }
  
      const refreshToken = jwt.sign( {}, 
        env.jwt_secret, { 
          expiresIn: '14d', 
          issuer: 'node-avengers' 
        }
      );
      const accessToken = jwt.sign({ userId: user._id }, 
        env.jwt_secret, {
          expiresIn: '1h',
          issuer: 'node-avengers'
        }
      );

      await Users.findOneAndUpdate({ _id: user._id}, {$set: { refreshToken }} ).lean();
  
      res.json({ message: "success", refreshToken, accessToken, userId: user._id });
    } catch(error) {
      res.status(401).json({ message: "fail", error });

      return;
    }
}

const logout = async (req: Request, res: Response) => {
    const userId = res.locals.user._id;

    try {
      await Users.findOneAndUpdate({ _id: userId }, { refreshToken: "" } ).lean();

      res.json({ message: "success" });
    } catch (error) {
      res.status(401).json({ message: "fail", error });
    }
}

const signout = async (req: Request, res: Response) => {
    const userId = res.locals.user._id;

    try {
      const user = await Users.findOne({ _id: userId }).lean();

      if (!user) {
        res.json({ message: "fail", error: "no existed user" });
        
        return;
      }

      // 해당 유저가 쓴 맥주도감들 삭제
      await MyBeers.deleteMany({ userId: user._id });

      // 해달 유저가 한 좋아요들 삭제
      const liked_beers = await Beers.find({ like_array: mongoose.Types.ObjectId(userId) }).lean();

      for (let i = 0; i < liked_beers.length; i ++) {
        let beerId = liked_beers[i]._id;

        await Beers.findOneAndUpdate({_id: beerId}, {$pull: {like_array: userId}});
      }

      // 회원 탈퇴
      await Users.deleteOne({ _id: userId });

      res.json({ message: "success" });
    } catch (error) {
      res.status(401).json({ message: "fail", error });
    }
}

const checkAuth = async (req: Request, res: Response) => {
    if (!res.locals.user) {
        res.status(401).json({ message: "fail", error: "unidentified user" });
  
        return;
      }
      
      const userId = res.locals.user._id;
      const nickname = res.locals.user.nickname;
      let preference = String(res.locals.user.preference);
      const image = res.locals.user.image;

      if (res.locals.accessToken) {
        res.json({ message: "success", userId, nickname, preference, image, accessToken: res.locals.accessToken });
      } else if (res.locals.refreshToken) {
        res.json({ message: "success", userId, nickname, preference, image, refreshToken: res.locals.refreshToken });
      } else {
        res.json({ message: "success", userId, nickname, preference, image });
      }
}

const googleLogin = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(
        "google", {
          successRedirect: "/",
          failureRedirect: "/login"
        }, (err, profile, info) => {
          if (err) return next(err);
  
          const tokens = String(info.message);
          const refreshToken = tokens.split("***")[0];
          const accessToken = tokens.split("***")[1];
  
          res.redirect(`https://ohsool.com/refresh=${refreshToken}&access=${accessToken}`);
        }
    )(req, res, next);
}

const kakaoLogin = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(
        "kakao",
        {
          failureRedirect: "/",
        }, (err, profile, info) => {
          if (err) return next(err);
  
          const { refreshToken, accessToken} = info;
  
          res.redirect(`https://ohsool.com/refresh=${refreshToken}&access=${accessToken}`);
        }
      )(req, res, next)
}

const postTest = async (req: Request, res: Response) => {
    try {
        const { userId, result } = req.body;
        let user = false;
    
        if (!result) {
          res.json({ message: "fail", error: "test result doesn't exist" });

          return;
        }
    
        /* 1. 카테고리에 대한 정보 추출*/ 
        const category = await BeerCategories.findOne({ name: result }).lean();

        // category 에 대한 정보가 없다면 함수 종료
        if (!category) {
          res.json({ message: "fail", error: "Beer Category doesn't exist" });

          return;
        }
    
        /* 2. 로그인 유저일 시 preference 변경 */
        const isExist = await Users.findOne({ _id: userId}).lean();
        let image = imagesArray[result];

        if (isExist) {
          await Users.updateOne({ _id: userId }, { $set: { preference: result, image }});

          user = true
        }
    
    
        /* 3. 추천 맥주 추출 (08/05 기준 동일한 카테고리 상위 2개만 추천) */
        const beers = await Beers.find({ categoryId: category._id }).lean();
        // 관련맥주에 대한 정보가 없다면 함수 종료
        if (!beers) {
          res.json({ message: "fail", error: "Beer doesn't exist" });

          return;
        }
        const recommendations = beers.slice(0,2)
      
        res.status(200).json({ message: "success", user, category, recommendations })
    
      } catch (error) {
        res.json({ message: "fail", error });
      }
}

export default {
    existedEmail,
    existedNickname,
    register,
    login,
    logout,
    signout,
    checkAuth,
    googleLogin,
    kakaoLogin,
    postTest
}