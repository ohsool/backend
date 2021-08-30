import express, { Request, Response, NextFunction, Router, response } from "express";
import https from "https";

import BeerCategoryController from "../controllers/beerCategory";
import { env } from "../env";
import { authMiddleware } from "../middlewares/auth-middleware";

const beerCategoryRouter = express.Router();

// 모든 맥주 카테고리 가져오기
beerCategoryRouter.get("/", BeerCategoryController.getBeerCategories);

// 모든 유저의 맥주 카테고리 취향에 관한 preference count 계산해서 데이터베이스에 저장하기
beerCategoryRouter.get("/preferencecount", BeerCategoryController.getPreferenceCount);

// 맥주 카테고리 추가하기
beerCategoryRouter.post("/", authMiddleware, BeerCategoryController.postBeerCategory);

// 특정 맥주 카테고리 가져오기
beerCategoryRouter.get("/:beerCategoryId", BeerCategoryController.getBeerCategory);

// 취향 테스트 결과 보여주기
beerCategoryRouter.post("/result", BeerCategoryController.getTestResult);



export { beerCategoryRouter };