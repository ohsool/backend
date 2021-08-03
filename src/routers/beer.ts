import express from "express";
import BeerController from "../controllers/beer";
import { authMiddleware } from "../middlewares/auth-middleware";

const beerRouter = express.Router();

beerRouter.get("/", BeerController.getBeers);

beerRouter.post("/", BeerController.postBeer);

beerRouter.get("/:beerId", BeerController.getBeer);

beerRouter.delete("/:beerId", BeerController.deleteBeer);

beerRouter.put("/like/:beerId", authMiddleware, BeerController.likeBeer);

beerRouter.put("/unlike/:beerId", authMiddleware, BeerController.unlikeBeer);

export { beerRouter };