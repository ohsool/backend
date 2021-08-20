import express from "express";
import BeerController from "../controllers/beer";
import { authMiddleware } from "../middlewares/auth-middleware";

const beerRouter = express.Router();

beerRouter.get("/list/all", BeerController.getBeers);

beerRouter.get("/list/page/:pageNo", BeerController.getSomeBeers);

beerRouter.post("/list", BeerController.postBeer);

beerRouter.get("/list/:beerId", BeerController.getBeer);

beerRouter.delete("/list/:beerId", BeerController.deleteBeer);

beerRouter.put("/like/:beerId", authMiddleware, BeerController.likeBeer);

beerRouter.put("/unlike/:beerId", authMiddleware, BeerController.unlikeBeer);

beerRouter.get("/liked", authMiddleware, BeerController.likedBeer);

beerRouter.post("/report-location", authMiddleware, BeerController.reportLocation);

beerRouter.get("/list/category/:categoryId", BeerController.getBeerByCategory);

export { beerRouter };