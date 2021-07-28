import express, {Request,Response,NextFunction,Router,response,} from "express";
import Comments from "../schemas/comment";
import { authMiddleware } from "../middlewares/auth-middleware";
import moment from "moment";

const commentRouter = express.Router();

// 댓글 업로드
commentRouter.post("/:beerId", authMiddleware, async (req, res) => {
  try {
    const { beerId } = req.params;
    const { content } = req.body;
    if (!content) {
      res.status(400).send({
        message: "내용이 없습니다.",
      });
      return;
    }
    const userId = res.locals.user._id;
    const date = moment().format("YYYY-MM-DD hh:mm A"); // 날짜 포맷 변경
    const taggedUser = getTaggedUser(content); // @ 기준 태그된 유저 가져오기

    await Comments.create({
      beerId,
      userId,
      content,
      date,
      tagged_array: taggedUser,
    });
    res.json({ message: "success" });
  } catch (err) {
    res.status(400).send({
      message: `[댓글 업로드] ${err}`,
    });
  }
});

// 댓글 조회
commentRouter.get("/:beerId", async (req, res) => {
  try {
    const { beerId } = req.params;
    if (!beerId) {
      // beerId 없을 시 진행 X
      res.status(400).send({
        message: "beerId 가 없습니다.",
      });
      return;
    }
    const comment = await Comments.find({ beerId }).sort("-date").lean();

    res.json({ result: comment });
  } catch (err) {
    res.status(400).send({
      message: `[댓글 조회] ${err}`,
    });
  }
});

// 댓글 삭제
commentRouter.delete("/:commentId", authMiddleware, async (req, res) => {
  try {
    const { commentId } = req.params;
    if (!commentId) {
      // commentId 없을 시 진행 X
      res.status(400).send({
        message: "commentId 가 없습니다.",
      });
      return;
    }
    await Comments.deleteOne({ _id: commentId });
    res.json({ message: "success" });
  } catch (err) {
    res.status(400).send({
      message: `[댓글 삭제] ${err}`,
    });
  }
});

// 댓글 수정
commentRouter.put("/:commentId", authMiddleware, async (req, res) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;
    if (!commentId || !content) {
      // commentId 또는 content가 없을 시 진행 X
      res.status(400).send({
        message: "commentId 또는 content를 확인해주세요.",
      });
      return;
    }
    const taggedUser = getTaggedUser(content); // @ 기준 태그된 유저 가져오기

    await Comments.updateOne(
      { _id: commentId },
      { $set: { content: content, edited: true, tagged_array: taggedUser } } // 내용 수정 시 'edited'는 true값으로 변경.
    );

    res.json({ message: "success" });
  } catch (err) {
    res.status(400).send({
      message: `[댓글 수정] ${err}`,
    });
  }
});

// 댓글 좋아요
commentRouter.put("/like/:commentId", authMiddleware, async (req, res) => {
  try {
    const { commentId } = req.params;
    const comment = await Comments.findOne({ _id: commentId });
    if (!comment) {
      res.status(400).send({
        message: "commentId 를 확인해주세요.",
      });
      return;
    }

    const userId = res.locals.user._id;
    if (comment.like_array.includes(userId)) {  // 중복된 아이디가 좋아요 배열에 있는지 확인
      res.status(400).send({
        message: "해당 아이디는 이미 좋아요를 눌렀습니다.",
      });
      return;
    }
    
    await Comments.updateOne( // 좋아요 배열에 아이디 추가
      { _id: commentId },
      { $push: { like_array: userId } } 
    );
   

    res.json({ message: "success" });
  } catch (err) {
    res.status(400).send({
      message: `[댓글 좋아요] ${err}`,
    });
  }
});

// 댓글 좋아요 취소
commentRouter.put("/unlike/:commentId", authMiddleware, async (req, res) => {
  try {
      const { commentId } = req.params;
      const comment = await Comments.findOne({ _id: commentId });
      
      if (!comment) {
        res.status(400).send({
          message: "commentId 를 확인해주세요.",
        });
        return;
      }

      const userId = res.locals.user._id;
      if (!comment.like_array.includes(userId)) {  // 중복된 아이디가 좋아요 배열에 있는지 확인
        res.status(400).send({
          message: "해당 아이디에 대한 좋아요 정보가 없습니다.",
        });
        return;
      }

      await Comments.updateOne( // 좋아요 배열에서 해당 유저 아이디 제거
        { _id: commentId },
        { $pull: { like_array: userId } } 
      );
      
    res.json({ message: "success" });
  } catch (err) {
    res.status(400).send({
      message: `[댓글 좋아요 취소] ${err}`,
    });
  }

});

// @ 기준 태그된 유저 가져온 후 @ 제거된 순수 닉네임만 저장
function getTaggedUser(content: any) {
  let taggedUser = content.match(/@[a-z가-힣1-9]+/gi);
  for (let i in taggedUser) {
    taggedUser[i] = taggedUser[i].replace("@", "");
  }
  return taggedUser;
}

export { commentRouter };
