import express from "express";
import BeerController from "../controllers/beer";
import { authMiddleware } from "../middlewares/auth-middleware";

const beerRouter = express.Router();

// 전체 리스트 출력하기
beerRouter.get("/list/all", BeerController.getBeers);   

// 페이지별 리스트 출력하기
beerRouter.get("/list/all/page", BeerController.getSomeBeers);  

// 맥주 추가하기
beerRouter.post("/list", authMiddleware, BeerController.postBeer);

// 맥주 하나 가져오기
beerRouter.get("/list/:beerId", BeerController.getBeer);

// 맥주 한 개 삭제하기
beerRouter.delete("/list/:beerId", authMiddleware, BeerController.deleteBeer);

// 맥주 좋아요
beerRouter.put("/like/:beerId", authMiddleware, BeerController.likeBeer);

// 맥주 좋아요 해제
beerRouter.put("/unlike/:beerId", authMiddleware, BeerController.unlikeBeer);

// 현재 유저가 좋아요한 리스트 가져오기
beerRouter.get("/liked", authMiddleware, BeerController.likedBeer);

// 장소 제보하기
beerRouter.post("/report-location", authMiddleware, BeerController.reportLocation);
 
// 카테고리별 리스트 출력하기
beerRouter.get("/categorylist", BeerController.getBeerByCategory); 

// 유저들의 맥주 취향을 데이터베이스에 반영하기 (모든 맥주)
beerRouter.post("/features/all", BeerController.getAllFeatures);

// 유저들의 맥주 취향을 데이터베이스에 반영하기 (특정 맥주)
beerRouter.post("/features/:beerId", BeerController.getFeatures);

export { beerRouter };