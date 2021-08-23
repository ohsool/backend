import express from "express";

import SearchContoller from "../controllers/search"

const searchRouter = express.Router();

searchRouter.get("/", SearchContoller.search);

searchRouter.get("/deep", SearchContoller.searchDeep);

searchRouter.get("/hashtag", SearchContoller.searchHashtag);

export { searchRouter };