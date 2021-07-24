import express, { Request, Response, NextFunction, Router, response } from "express";
import Comments from "../schemas/comment";

const commentRouter = express.Router();

commentRouter.get("/", async(req, res) => {
    res.json()
});

export { commentRouter };