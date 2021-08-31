import express from "express";
import recommendController from "../controllers/recommendation";
import { authMiddleware } from "../middlewares/auth-middleware";

const recommendationRouter = express.Router();

// 슬랙을 통해 맥주 추천 전달하기
recommendationRouter.post(
  "/",
  authMiddleware,
  recommendController.postRecommendation
);

// 맥주 추천 반영사항 메일 보내기
recommendationRouter.post(
  "/feedback/success",
  recommendController.sendFeedback
);

export { recommendationRouter };
