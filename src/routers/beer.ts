import express from "express";
import BeerController from "../controllers/beer";

const beerRouter = express.Router();

beerRouter.get("/", BeerController.getBeers);

beerRouter.post("/", BeerController.postBeer);

beerRouter.get("/:beerId", BeerController.getBeer);

beerRouter.delete("/:beerId", BeerController.deleteBeer);

beerRouter.put("/like", BeerController.likeBeer);

beerRouter.put("/unlike", BeerController.unlikeBeer);

export { beerRouter };