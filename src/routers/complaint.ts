import express from "express";
import complaintController from "../controllers/complaint";
import { authMiddleware } from "../middlewares/auth-middleware";

const complaintRouter = express.Router();

// 슬랙을 통해 불편사항 전달하기
complaintRouter.post("/", authMiddleware, complaintController.postComplaint); 

export { complaintRouter };