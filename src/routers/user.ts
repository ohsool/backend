import express from "express";
import passport from "passport";

import UserContoller from "../controllers/user"

import { authMiddleware } from "../middlewares/auth-middleware";
import { secretKeyMiddleware } from "../middlewares/secretkey-middleware";

const userRouter = express.Router();

// 중복 이메일 확인
userRouter.post("/email", UserContoller.existEmail);

// 중복 닉네임 확인
userRouter.post("/nickname", secretKeyMiddleware, UserContoller.existNickname);

// 회원가입
userRouter.post("/", secretKeyMiddleware, UserContoller.register);

// 로그인
userRouter.post("/auth", secretKeyMiddleware, UserContoller.login);

// 로그아웃
userRouter.post("/logout", secretKeyMiddleware, authMiddleware, UserContoller.logout)

// 회원탈퇴
userRouter.delete("/", secretKeyMiddleware, authMiddleware, UserContoller.signout)

// 로그인 되어있는 유저인지 확인
userRouter.get("/me", authMiddleware, UserContoller.checkAuth)

// 구글 로그인
userRouter.get("/google", passport.authenticate("google", { scope: ["email", "profile"] }));
 
// 구글 로그인 Callback
userRouter.get("/google/callback", UserContoller.googleLogin);

// 카카오 로그인
userRouter.get("/kakao", passport.authenticate("kakao"));

// 카카오 로그인 Callback
userRouter.get("/kakao/callback", UserContoller.kakaoLogin);

// 현재 유저 preference에 테스트 결과 값 반영 & 클라이언트에게 결과에 대한 정보 돌려주기
userRouter.post("/test", secretKeyMiddleware, UserContoller.postTest);

// 첫 소셜 로그인시에만 닉네임, 이메일이 중복되거나 없을 수 있기 때문에 다시 받기
userRouter.post("/socialuser", secretKeyMiddleware, authMiddleware, UserContoller.socialUserSet);

// 유저 정보 가져오기
userRouter.get("/user-info/:userId", secretKeyMiddleware, UserContoller.getUserInfo);

// 닉네임 바꾸기
userRouter.put("/nickname", secretKeyMiddleware, authMiddleware, UserContoller.changeNickname);

// 내 소개(description) 변경하기
userRouter.put("/description", secretKeyMiddleware, authMiddleware, UserContoller.changeDescription);

// 비밀번호 리셋하기
userRouter.put("/password/reset", secretKeyMiddleware, UserContoller.resetPassword);

// 비밀번호 변경하기
userRouter.put("/password", secretKeyMiddleware, authMiddleware, UserContoller.changePassword);

// 계정 공개로 설정하기
userRouter.put("/public/public", secretKeyMiddleware, authMiddleware, UserContoller.setToPublic);

// 계정 비공개로 설정하기
userRouter.put("/public/private", secretKeyMiddleware, authMiddleware, UserContoller.setToPrivate);

// 특정 유저 팔로우하기
userRouter.put("/follow/follow", secretKeyMiddleware, authMiddleware, UserContoller.followUser);

// 특정 유저 팔로우 취소하기
userRouter.put("/follow/unfollow", secretKeyMiddleware, authMiddleware, UserContoller.unfollowUser);

// 특정 유저의 팔로우, 팔로워 리스트 보내주기
userRouter.get("/follow/followers/:userId", secretKeyMiddleware, UserContoller.givesFollows);

export { userRouter };