import express, { Request, Response, NextFunction, Router, response } from "express";
import BeerCategoryController from "../controllers/beerCategory";
import { authMiddleware } from "../middlewares/auth-middleware";

const beerCategoryRouter = express.Router();


beerCategoryRouter.get("/", BeerCategoryController.getBeerCategories);


beerCategoryRouter.post("/", authMiddleware, BeerCategoryController.postBeerCategory);

// get one category specified by parameter
beerCategoryRouter.get("/:beerCategoryId", BeerCategoryController.getBeerCategory);


beerCategoryRouter.post("/result", BeerCategoryController.getTestResult);


export { beerCategoryRouter };