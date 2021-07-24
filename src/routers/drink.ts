import express, { Request, Response, NextFunction, Router, response } from "express";
import Drinks from "../schemas/drink";

const drinkRouter = express.Router();

drinkRouter.get("/", async(req, res) => {
    res.json()
});

export { drinkRouter };