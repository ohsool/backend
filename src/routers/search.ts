import express from "express";

import SearchContoller from "../controllers/search"

const searchRouter = express.Router();

searchRouter.get("/", SearchContoller.search);

searchRouter.get("/hashtag", SearchContoller.searchHashtag);

export { searchRouter };