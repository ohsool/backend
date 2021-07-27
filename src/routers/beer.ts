import express, { Request, Response, NextFunction, Router, response } from "express";
import Beers from "../schemas/beer";

const beerRouter = express.Router();

beerRouter.get("/", async(req, res) => {
    res.json()
});

export { beerRouter };