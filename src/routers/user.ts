import express from "express";
import passport from "passport";

import UserContoller from "../controllers/user"

import { authMiddleware } from "../middlewares/auth-middleware";
import { secretKeyMiddleware } from "../middlewares/secretkey-middleware";

const userRouter = express.Router();

// existed email?
userRouter.post("/email", UserContoller.existedEmail);

// existed nickname?
userRouter.post("/nickname", secretKeyMiddleware, UserContoller.existedNickname);

// Register
userRouter.post("/", secretKeyMiddleware, UserContoller.register);

// login
userRouter.post("/auth", secretKeyMiddleware, UserContoller.login);

// Logout
userRouter.post("/logout", secretKeyMiddleware, authMiddleware, UserContoller.logout)

// sign out
userRouter.delete("/", secretKeyMiddleware, authMiddleware, UserContoller.signout)

// if the person is logged in
userRouter.get("/me", authMiddleware, UserContoller.checkAuth)

// google login
userRouter.get("/google", passport.authenticate("google", { scope: ["email", "profile"] }));

// GoogleLogin
userRouter.get("/google/callback", UserContoller.googleLogin);

// kakao login
userRouter.get("/kakao", passport.authenticate("kakao"));

userRouter.get("/kakao/callback", UserContoller.kakaoLogin);

// 현재 유저 preference에 테스트 결과 값 반영 & 클라이언트에게 결과에 대한 정보 돌려주기
userRouter.post("/test", secretKeyMiddleware, UserContoller.postTest);

  export { userRouter };