import express, { Request, Response, NextFunction, Router, response } from "express";
import https from "https";

import BeerCategoryController from "../controllers/beerCategory";
import { env } from "../env";
import { authMiddleware } from "../middlewares/auth-middleware";

const beerCategoryRouter = express.Router();

beerCategoryRouter.get("/", BeerCategoryController.getBeerCategories);

// get preference count of all categories in one time
beerCategoryRouter.get("/preferencecount", BeerCategoryController.getPreferenceCount);

beerCategoryRouter.post("/", authMiddleware, BeerCategoryController.postBeerCategory);

// get one category specified by parameter
beerCategoryRouter.get("/:beerCategoryId", BeerCategoryController.getBeerCategory);

beerCategoryRouter.post("/result", BeerCategoryController.getTestResult);



export { beerCategoryRouter };