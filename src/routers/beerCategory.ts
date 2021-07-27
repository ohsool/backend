import express, { Request, Response, NextFunction, Router, response } from "express";
import BeerCategories from "../schemas/beerCategory";

const beerCategoryRouter = express.Router();

beerCategoryRouter.get("/", async(req, res) => {
    res.json()
});

export { beerCategoryRouter };