import express, { Request, Response, NextFunction, Router, response } from "express";
import Albtis from "../schemas/albti";

const albtiRouter = express.Router();

albtiRouter.get("/", async(req, res) => {
    res.json()
});

export { albtiRouter };