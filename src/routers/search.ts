import express from "express";

import SearchContoller from "../controllers/search";

const searchRouter = express.Router();

// 맥주, 맥주 카테고리, 해시태그 검색 -> 사용자가 한 글자씩 칠때마다 들어오는 API
searchRouter.get("/", SearchContoller.search);

// 맥주, 맥주 카테고리, 해시태그 검색 -> 사용자가 엔터 치면 들어오는 API
searchRouter.get("/deep", SearchContoller.searchDeep);

// 해시태그 클릭
searchRouter.get("/hashtag", SearchContoller.searchHashtag);

export { searchRouter };
