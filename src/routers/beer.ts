import express from "express";
import BeerController from "../controllers/beer";
import { authMiddleware } from "../middlewares/auth-middleware";

const beerRouter = express.Router();

beerRouter.get("/list/all", BeerController.getBeers);   // 전체 리스트 출력하기

beerRouter.get("/list/all/page", BeerController.getSomeBeers);  // 페이지별 리스트 출력하기

beerRouter.post("/list", BeerController.postBeer);

beerRouter.get("/list/:beerId", BeerController.getBeer);

beerRouter.delete("/list/:beerId", BeerController.deleteBeer);

beerRouter.put("/like/:beerId", authMiddleware, BeerController.likeBeer);

beerRouter.put("/unlike/:beerId", authMiddleware, BeerController.unlikeBeer);

beerRouter.get("/liked", authMiddleware, BeerController.likedBeer);

beerRouter.post("/report-location", authMiddleware, BeerController.reportLocation);
 
beerRouter.get("/categorylist", BeerController.getBeerByCategory); // 카테고리별 리스트 출력하기

export { beerRouter };