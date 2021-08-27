import express from "express";
import myBeerController from "../controllers/myBeer";
import { authMiddleware } from "../middlewares/auth-middleware";

const myBeerRouter = express.Router();

// 도감 업로드하기
myBeerRouter.post("/:beerId", authMiddleware, myBeerController.postMyBeer); 

// 모든 유저의 도감 가져오기
myBeerRouter.get("/all", authMiddleware,  myBeerController.getAllMyBeers);

// 현재 유저의 도감 가져오기
myBeerRouter.get("/my", authMiddleware, myBeerController.getCurrentMyBeers);

// 특정 유저의 도감 및 좋아요한 맥주 가져오기
myBeerRouter.get("/others/:userId", myBeerController.getUserMyBeers);

// 현재 유저가 작성한 맥주도감 개수 가져오기
myBeerRouter.get("/my/length/:userId", authMiddleware, myBeerController.getLengthOfMyBeers);

// 특정 맥주의 전체 도감 가져오기
myBeerRouter.get("/beer", myBeerController.getBeerAllReviews);

// 특정 도감의 상세 정보 가져오기
myBeerRouter.get("/:myBeerId", authMiddleware, myBeerController.getMyBeer);

// 특정 도감 수정하기
myBeerRouter.put("/:myBeerId", authMiddleware, myBeerController.updateMyBeer);

// 특정 도감 삭제하기
myBeerRouter.delete("/:myBeerId", authMiddleware, myBeerController.deleteMyBeer);


export { myBeerRouter };