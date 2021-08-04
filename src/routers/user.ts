import express, { Request, Response, NextFunction, Router, response } from "express";
import passport from "passport";
import joi from "joi";
import jwt from "jsonwebtoken";
import crypto from "crypto";

import Users from "../schemas/user";
import { authMiddleware } from "../middlewares/auth-middleware";

const userRouter = express.Router();

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

  // existed email?
  userRouter.get("/email", async (req, res) => {
    const { email } = req.body;

    if (!email) {
      res.json({ message: "fail", error: "no input" });

      return
    }

    try {
      const existedUser = await Users.findOne({ email });

      if (existedUser) {
        res.json({ message: "success", existed: true });
      } else {
        res.json({ message: "success", existed: false });
      }
    } catch (error) {
      res.json({ message: "fail", error });
    }
    
  });

  // existed nickname?
  userRouter.get("/nickname", async (req, res) => {
    const { nickname } = req.body;

    if (!nickname) {
      res.json({ message: "fail", error: "no input" });

      return
    }

    try {
      const existedUser = await Users.findOne({ nickname });

      if (existedUser) {
        res.json({ message: "success", existed: true });
      } else {
        res.json({ message: "success", existed: false });
      }
    } catch (error) {
      res.json({ message: "fail", error });
    }
  });

  // register
  userRouter.post("/", async (req, res) => {
      const { email, nickname, password, confirmPassword } = req.body;
    
      try {
        const existUser1 = await Users.findOne({ nickname });
        const existUser2 = await Users.findOne({ email });

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
          const crypted_password = crypto.createHmac("sha256", password).update("¡hellosnail!").digest("hex");

          await Users.create({ email, nickname, password: crypted_password });

          res.status(201).json({ message: "success" });
      } else {
          res.json({ message: "fail", error: error.details[0].message });
      }
  });

  // login
  userRouter.post("/auth", async (req, res) => {
    let { email, password } = req.body;

    const crypted_password = crypto.createHmac("sha256", password).update("¡hellosnail!").digest("hex");
    try {
      const user = await Users.findOne({ email });

      if (user.password != crypted_password) {
        res.status(401).json({ message: "fail", error: "wrong password" });
  
        return;
      }
  
      const token = jwt.sign({ userId: user._id }, "bananatulip");
  
      res.json({ message: "success", token });
    } catch(error) {
      res.status(401).json({ message: "fail", error });

      return;
    }
  });

  // sign out
  userRouter.delete("/", authMiddleware, async (req, res) => {
    const userId = res.locals.user._id;

    try {
      const user = await Users.findOneAndDelete({ _id: userId });

      res.json({ message: "success" });
    } catch (error) {
      res.status(401).json({ message: "fail", error });
    }

  })

  // if the person is logged in
  userRouter.get("/me", authMiddleware, async (req, res, next) => {
    if (!res.locals.user) {
      res.status(401).json({ message: "fail", error: "unidentified user" });

      return;
    }
    
    const userId = res.locals.user._id;
    const nickname = res.locals.user.nickname;
    const preference = res.locals.user.preference;

    res.json({ message: "success", userId, nickname, preference });
  })

  // google login
  userRouter.get("/google", passport.authenticate("google", { scope: ["email", "profile"] }));

  userRouter.get("/google/callback", (req, res, next) => {
    passport.authenticate(
      "google", {
        successRedirect: "/",
        failureRedirect: "/login"
      }, (err, profile, info) => {
        if (err) return next(err);

        const token = info.message;

        res.redirect(`https://오늘의술.shop/token=${token}`)
      }
    )(req, res, next)
  });

  // kakao login
  userRouter.get("/kakao", passport.authenticate("kakao"));

  userRouter.get("/kakao/callback", (req, res, next) => {
    passport.authenticate(
      "kakao",
      {
        failureRedirect: "/",
      }, (err, profile, info) => {
        if (err) return next(err);

        const token = info.message;

        res.redirect(`https://오늘의술.shop/token=${token}`)
      }
    )(req, res, next);
  })


  export { userRouter };