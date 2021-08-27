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

import { IUser } from "../interfaces/user";

import { mailSender }  from '../email/mail'

import { env } from "../env";
import { access } from "fs";

const joiSchema = joi.object({
    email: joi
      .string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    nickname: joi.string().min(1).max(8).required(),
    password: joi.string().min(4).pattern(new RegExp("^[a-zA-Z0-9]{4,30}$")),
    confirmPassword: joi.ref("password")
  });
  // id 포함 안하게

  const emailJoiSchema = joi.object({
    email: joi
      .string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required()
  })

  const nicknameJoiSchema = joi.object({
    nickname: joi.string().min(1).max(8).required()
  })
  
  const emailNicknameJoiSchema = joi.object({
    email: joi
      .string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    nickname: joi.string().min(1).max(8).required()
  })

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

  const test_emails = [
    "mybeertest@test.com", 
    "anothermybeertest@test.com", 
    "recommendationtest@test.com",
    "usertest@test.com"
  ]
  const test_nicknames = [
    "mybeertest",
    "anothermybeertest22",
    "slackwebkittest",
    "test"
  ]

const existEmail = async(req: Request, res: Response) => {
    const { email } = req.body;
    
    if (!email) {
      res.json({ message: "fail", error: "no input" });

      return
    }

    if ( test_emails.includes(email) ) {
      res.json({ message: "fail", error: "email for test. don't use this" });

      return
    }

    try {
      const existUser = await Users.findOne({ email }).lean();

      if (existUser) {
        res.json({ message: "fail", error: "exist email" });

        return
      } 

      const { value, error } = emailJoiSchema.validate({ email });

      if (error) {
        res.json({ message: "fail", error: "wrong email", error_detail: error.details[0].message });

        return;
      }

      res.json({ message: "success" });

    } catch (error) {
      res.json({ message: "fail", error });
    }
}

const existNickname = async(req: Request, res: Response) => {
    const { nickname } = req.body;

    if (!nickname) {
      res.json({ message: "fail", error: "no input" });

      return
    }

    if ( test_nicknames.includes(nickname) ) {
      res.json({ message: "fail", error: "nickname for test. don't use this" });

      return
    }

    try {
      const existUser = await Users.findOne({ nickname }).lean();

      if (existUser) {
        res.json({ message: "fail", error: "exist nickname" });

        return
      } 

      const { value, error } = nicknameJoiSchema.validate({ nickname });

      if (error) {
        res.json({ message: "fail", error: "wrong nickname", error_detail: error.details[0].message });

        return;
      }

      res.json({ message: "success" });

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
            res.json({ message: "fail", error: "exist user" });
  
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
            toEmail: email,     
            nickname: nickname, 
            type: 'welcome',   
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

    if (!email || !password) {
      res.status(401).json({ message: "fail", error: "wrong input" });
  
      return;
    }

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

      const refreshToken1 = refreshToken.split(".")[0];
      const refreshToken2 = "." + refreshToken.split(".")[1] + "." + refreshToken.split(".")[2];

      const accessToken1 = accessToken.split(".")[0];
      const accessToken2 = "." + accessToken.split(".")[1] + "." + accessToken.split(".")[2];
  
      res.json({ message: "success", dlfwh: refreshToken1, ghkxld: refreshToken2, dhtnf: accessToken1, chlrh: accessToken2, userId: user._id });
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
        res.json({ message: "fail", error: "no exist user" });
        
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
      const preference = String(res.locals.user.preference);
      const image = res.locals.user.image;

      // if (res.locals.accessToken) {
      //   res.json({ message: "success", userId, nickname, preference, image, accessToken: res.locals.accessToken });
      // } else if (res.locals.refreshToken) {
      //   res.json({ message: "success", userId, nickname, preference, image, refreshToken: res.locals.refreshToken });
      // } else {
      //   res.json({ message: "success", userId, nickname, preference, image });
      // }

      res.json({ message: "success", userId, nickname, preference, image });
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
          const first = tokens.split("***")[2];

          const refreshToken1 = refreshToken.split(".")[0];
          const refreshToken2 = "." + refreshToken.split(".")[1] + "." + refreshToken.split(".")[2];

          const accessToken1 = accessToken.split(".")[0];
          const accessToken2 = "." + accessToken.split(".")[1] + "." + accessToken.split(".")[2];
  
          res.redirect(`https://ohsool.com/dlfwh=${refreshToken1}&ghkxld=${refreshToken2}&dhtnf=${accessToken1}&chlrh=${accessToken2}&first=${first}`);
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
  
          const { refreshToken, accessToken, first } = info;

          const refreshToken1 = refreshToken.split(".")[0];
          const refreshToken2 = "." + refreshToken.split(".")[1] + "." + refreshToken.split(".")[2];

          const accessToken1 = accessToken.split(".")[0];
          const accessToken2 = "." + accessToken.split(".")[1] + "." + accessToken.split(".")[2];
  
          res.redirect(`https://ohsool.com/dlfwh=${refreshToken1}&ghkxld=${refreshToken2}&dhtnf=${accessToken1}&chlrh=${accessToken2}&first=${first}`);
        }
      )(req, res, next)
}

// 현재 유저 preference에 테스트 결과 값 반영 & 클라이언트에게 결과에 대한 정보 돌려주기
/*
  테스트 결과 추출 단계
  1. 맥주 카테고리 추출
  2. 카테고리 내에서 국가 선택
  3. 국가별 높은 도수/ 낮은 도수/ 랜덤 선택 
*/
const postTest = async (req: Request, res: Response) => {
    try {
        const { userId, result } = req.body;
        let isExistUser = false; // 로그인 유저와 비로그인 유저를 구분짓는 값
  
        if (!result) {
          res.json({ message: "fail", error: "test result doesn't exist" });
          return;
        }
    
        /* 1. 카테고리에 대한 정보 추출*/ 
        const category = await BeerCategories.findOne({ name: result[0] }).lean();
        // category 에 대한 정보가 없다면 함수 종료
        if (!category) {
          res.json({ message: "fail", error: "Beer Category doesn't exist" });
          return;
        }

        const preferenceCount = category.preferenceCount!;

        /* 2. 카테고리 내에서 해당되는 국가 & 도수 선택 */ 
        let distantOption = result[1] === 'distant' ? true : false;
        let sortOption = result[2] === 'many' ? -1 : 1;
        let beers = await Beers.find({ $and: [{ categoryId: category._id }, { isDistant: distantOption }], })
                                 .sort([[ "degree", sortOption ]])
                                 .lean();
        
        // 만약 위 조건에 맞는 맥주가 2개보다 적다면 '국가' 반영없이 도수 기준으로 리스트를 출력한다.
        if (beers.length < 2) {
          beers = await Beers.find({ categoryId: category._id }).sort([[ "degree", sortOption ]]).lean();
        }

        /* 3. 추천 맥주 추출 */
        const recommendations = beers.slice(0,2)
        
        /* 4. 로그인 유저일 시 preference 변경 */
        const user = await Users.findOne({ _id: userId}).lean();
        const preference = user!.preference;
        let image = imagesArray[result[0]];

        if (user) {
          await Users.updateOne({ _id: userId }, { $set: { preference: result[0], image }});

          if (preference != "Unknown") {  // 유저의 preference가 있었다면 그 preference의 count -= 1
            await BeerCategories.updateOne({ name: preference }, { $inc: { 'preferenceCount': -1 } });
          }
          // test 결과 나온 category에 count += 1
          const beerCategory = await BeerCategories.updateOne({ name: result[0] }, { $inc: { 'preferenceCount': 1 } });

          isExistUser = true;
        }
        
        const preferenceCounts = await BeerCategories.find({}).select("preferenceCount -_id");
        let sum = 0;

        for (let i = 0; i < preferenceCounts.length; i ++) {
          const count = preferenceCounts[i]!.preferenceCount!;
          sum += count;
        }

        const percentage = (+preferenceCount / sum) * 100;

        res.status(200).json({ message: "success", isExistUser, category, recommendations, percentage });
    
      } catch (error) {
        res.json({ message: "fail", error });
      }
}

const socialUserSet = async (req: Request, res: Response) => {
  const { email, nickname } = req.body;
  const userId = res.locals.user._id;

  if ( test_emails.includes(email) ) {
    res.json({ message: "fail", error: "email for test. don't use this" });

    return
  }

  if ( test_nicknames.includes(nickname) ) {
    res.json({ message: "fail", error: "nickname for test. don't use this" });

    return
  }

  try {
    const existUser1 = await Users.findOne({ nickname }).lean();
    const existUser2 = await Users.findOne({ email }).lean();

    if (existUser1 && String(existUser1._id) != String(userId)) {
      res.json({ message: "fail", error: "exist nickname" });

      return
    }

    if (existUser2 && String(existUser2._id) != String(userId)) {
      res.json({ message: "fail", error: "exist email" });

      return
    } 

    const { value, error } = emailNicknameJoiSchema.validate({ email, nickname });

    if (error) {
      res.json({ message: "fail", error: "wrong email or wrong nickname", error_detail: error.details[0].message });

      return;
    }

    const user = await Users.findById(res.locals.user._id);

    if (!user) {
      res.json({ message: "fail", error: "not exist user" });

      return;
    }

    await Users.findOneAndUpdate({ _id: res.locals.user._id }, {$set: { nickname, email }});

    res.json({ message: "success" });
  } catch (error) {
    res.json({ message: "fail", error });
  }
}

const changeNickname = async (req: Request, res: Response) => {
  const { nickname } = req.body;

  if ( test_nicknames.includes(nickname) ) {
    res.json({ message: "fail", error: "nickname for test. don't use this" });

    return
  }

  try {
    const existUser = await Users.findOne({ nickname }).lean();

    if (existUser) {
      res.json({ message: "fail", error: "exist nickname" });

      return
    }

    const { value, error } = nicknameJoiSchema.validate({ nickname });

    if (error) {
      res.json({ message: "fail", error: "wrong nickname", error_detail: error.details[0].message });

      return;
    }

    const user = await Users.findById(res.locals.user._id);

    if (!user) {
      res.json({ message: "fail", error: "not exist user" });

      return;
    }

    await Users.findOneAndUpdate({ _id: res.locals.user._id }, {$set: { nickname }});

    res.json({ message: "success" });
  } catch (error) {
    res.json({ message: "fail", error });
  }
}

// 내 소개(description) 변경하기
const changeDescription = async (req: Request, res: Response) => {
  const description = req.body.description;
  const old_description = res.locals.user.description;
  const userId = res.locals.user._id;

  try {
    let user = await Users.findById(userId);

    if (!user) {
      res.json({ message: "fail", error: "no exist user" });

      return;
    }

    if (old_description == description) {
      res.json({ message: "fail", error: "not changed" });

      return;
    }

    if (description.length > 60) {
      res.json({ message: "fail", error: "too long" });

      return;
    }
    
    user = await Users.findByIdAndUpdate(userId, { $set: { description } });

    res.json({ message: "success" });
  } catch (error) {
    res.json({ message: "fail", error });
  }
  
}

// 계정 공개로 설정하기
const setToPublic = async (req: Request, res: Response) => {
  const userId = res.locals.user._id;
  const is_public = res.locals.user.is_public;

  try {
    let user = await Users.findById(userId);

    if (!user) {
      res.json({ message: "fail", error: "no exist user" });
  
      return;
    }

    // is_public == true: 공개
    // is_public == false: 비공개
    // is_public == undefined: 공개
    if (is_public || is_public == null) {
      res.json({ message: "fail", error: "user is already public" });
  
      return;
    }

    user = await Users.findByIdAndUpdate(userId, { $set: { is_public: true } });

    res.json({ message: "success" });
  } catch (error) {
    res.json({ message: "fail", error });
  }
}

// 계정 비공개로 설정하기
const setToPrivate = async (req: Request, res: Response) => {
  const userId = res.locals.user._id;
  const is_public = res.locals.user.is_public;

  try {
    let user = await Users.findById(userId);

    if (!user) {
      res.json({ message: "fail", error: "no exist user" });
  
      return;
    }

    // is_public == true: 공개
    // is_public == false: 비공개
    // is_public == undefined: 공개
    if (is_public == false) {
      res.json({ message: "fail", error: "user is already private" });
  
      return;
    }

    user = await Users.findByIdAndUpdate(userId, { $set: { is_public: false } });

    res.json({ message: "success" });
  } catch (error) {
    res.json({ message: "fail", error });
  }
}

// 특정 유저 팔로우하기
// follow_list: 내가 팔로우 하는 유저 리스트
// follower_list: 나를 팔로우 하는 유저 리스트
const followUser = async (req: Request, res: Response) => {
  const userId = res.locals.user._id;
  const myFollowList = res.locals.user.follow_list;
  const followUserId = req.body.userId;

  if (userId == followUserId) {
    res.json({ message: "fail", error: "cannot follow myself" });

      return;
  }

  try {
    const user = await Users.findById(userId);
    const followUser = await Users.findById(followUserId);
    
    if (!user || !followUser) {
      res.json({ message: "fail", error: "no exist user" });

      return;
    }

    const userFollowerList = followUser!.follower_list;

    if (!myFollowList) {  // 내 팔로우 리스트가 비어있다면 (첫번째 팔로우라면)
      await Users.findByIdAndUpdate(userId, { $set: { follow_list: [followUserId] } } );

      if (!userFollowerList) {  // 상대방의 팔로워 리스트도 비어있다면 (첫번째 팔로워라면)
        await Users.findByIdAndUpdate(followUserId, { $set: { follower_list: [userId] } } );
      } else if (userFollowerList?.includes(userId) == false) {
        await Users.findByIdAndUpdate(followUserId, { $push: { follower_list: [userId] } } );
      }

      res.json({ message: "success" });

      return;
    }

    if (myFollowList.includes(followUserId)) { // 내 팔로우 리스트에 그 유저가 이미 있다면
      if (userFollowerList?.includes(userId) == false) {  // 근데 상대방 팔로워 리스트에 내가 없다면 (오류)
        await Users.findByIdAndUpdate(followUserId, { $push: { follower_list: [userId] } } );
      } else if (!userFollowerList) {
        await Users.findByIdAndUpdate(followUserId, { $set: { follower_list: [userId] } } );
      }

      res.json({ message: "fail", error: "user already follow this user" });

      return;
    }

    if (userFollowerList?.includes(userId)) { // 그 유저 팔로우 리스트에 내가 이미 있다면
      if (myFollowList.includes(followUserId) == false) { // 근데 내 팔로우 리스트에 그 유저가 없다면 (오류)
        await Users.findByIdAndUpdate(userId, { $push: { follow_list: [followUserId] } } );
      } else if (!myFollowList) {
        await Users.findByIdAndUpdate(userId, { $set: { follow_list: [followUserId] } } );
      }

      res.json({ message: "fail", error: "user already follow this user" });

      return;
    }

    await Users.findByIdAndUpdate(userId, { $push: { follow_list: [followUserId] } } );
    await Users.findByIdAndUpdate(followUserId, { $push: { follower_list: [userId] } } );

    res.json({ message: "success" });
  } catch (error) {
    res.json({ message: "fail", error });
  }
}

// 특정 유저 팔로우 취소하기
const unfollowUser = async (req: Request, res: Response) => {
  const userId = res.locals.user._id;
  const myFollowList = res.locals.user.follow_list;
  const followUserId = req.body.userId;

  if (userId == followUserId) {
    res.json({ message: "fail", error: "cannot unfollow myself" });

      return;
  }

  try {
    const user = await Users.findById(userId);
    const followUser = await Users.findById(followUserId);

    if (!user || !followUser) {
      res.json({ message: "fail", error: "no exist user" });

      return;
    }

    const userFollowerList = followUser!.follower_list;

    if (!myFollowList || myFollowList.length == 0 || myFollowList.includes(followUserId) == false) {
      // 팔로우 리스트가 비어있거나 팔로우 리스트에 그 유저가 없다면
      res.json({ message: "fail", error: "user is not following this user" });

      return;
    }

    if (myFollowList.includes(followUserId)) {  // 팔로우 리스트에 그 유저가 있다면
      await Users.findByIdAndUpdate(userId, { $pull: { follow_list: followUserId } } );

      if (!userFollowerList || userFollowerList.length == 0 || userFollowerList?.includes(userId) == false) {
        // 그 유저 팔로워 리스트가 비어있거나 그 유저 팔로워 리스트에 내가 없다면
        res.json({ message: "success" });

        return;
      }
      
      await Users.findByIdAndUpdate(followUserId, { $pull: { follower_list: userId } } );
    }

    res.json({ message: "success" });
  } catch (error) {
    res.json({ message: "fail", error });
  }
}

export default {
    existEmail,
    existNickname,
    register,
    login,
    logout,
    signout,
    checkAuth,
    googleLogin,
    kakaoLogin,
    postTest,
    socialUserSet,
    changeNickname,
    changeDescription,
    setToPublic,
    setToPrivate,
    followUser,
    unfollowUser
}