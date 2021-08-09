import express, { Request, Response, NextFunction, Router, response } from "express";
import BeerCategoryController from "../controllers/beerCategory";

const beerCategoryRouter = express.Router();


beerCategoryRouter.get("/", BeerCategoryController.getBeerCategories);


beerCategoryRouter.post("/", BeerCategoryController.postBeerCategory);

// get one category specified by parameter
beerCategoryRouter.get("/:beerCategoryId", BeerCategoryController.getBeerCategory);


beerCategoryRouter.get("/result/:beerCategory", BeerCategoryController.getTestResult);


export { beerCategoryRouter };