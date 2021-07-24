import express, { Request, Response, NextFunction, Router, response } from "express";
import DrinkCategories from "../schemas/drinkCategory";

const drinkCategoryRouter = express.Router();

drinkCategoryRouter.get("/", async(req, res) => {
    res.json()
});

export { drinkCategoryRouter };