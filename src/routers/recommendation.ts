import express from "express";
import recommendController from "../controllers/recommendation";
import { authMiddleware } from "../middlewares/auth-middleware";

const recommendationRouter = express.Router();

// 슬랙을 통해 불편사항 전달하기
recommendationRouter.post("/", authMiddleware, recommendController.postRecommendation); 

recommendationRouter.get("/", recommendController.test); 


export { recommendationRouter };