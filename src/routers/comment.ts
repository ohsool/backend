import express, { Request, Response, NextFunction, Router, response } from "express";
import Comments from "../schemas/comment";
import moment from 'moment';

const commentRouter = express.Router();

// 댓글 업로드 auth middleware 추가 필요
commentRouter.post("/:drink", async(req, res) => {
    try {
        const { drink } = req.params;
        const { content } = req.body;
        if (!content) {
            res.status(400).send({
                message: "내용이 없습니다."
            });
            return;
        }
        // local stroage 확인 필요
        // const userId = res.locals.user.userId;
        const userId = '12345'
        // date 확인 필요 (moment 라이브러리 사용)
        const date = moment().format('YYYY-MM-DD');
    
        await Comments.create({ drink, userId, content, date });
    
        res.json({ message: 'success' });

    } catch(err) {
        res.status(400).send({
            message: `[댓글 업로드] ${err}`
        });
    };
});


// 주류 별 댓글 조회 
commentRouter.get('/:drinkId', async (req, res) => {
    try {     
        const { drinkId } = req.params;
        // drinkId가 없을 시 진행 X
        if (!drinkId) {
            res.status(400).send({
                message: "drinkId 가 없습니다."
            });
            return;
        };

        const comment = await Comments.findOne({ drinkId });
        res.json({ result: comment })
            
    } catch (err) {
        res.status(400).send({
            message: `[댓글 조회] ${err}`
        });
    };
});

// 댓글 삭제 auth middleware 추가 필요
commentRouter.delete('/:drinkId', async (req, res) => {
    try {     
        const { drinkId } = req.params;
        // drinkId가 없을 시 진행 X
        if (!drinkId) {
            res.status(400).send({
                message: "drinkId 가 없습니다."
            })
            return;
        }
        await Comments.deleteOne({ drinkId });
        res.json({ message: 'success' });
            
    } catch (err) {
        res.status(400).send({
            message: `[댓글 삭제] ${err}`
        });
    };
});


// 댓글 수정 auth middleware 추가 필요
commentRouter.put('/:drinkId', async (req, res) => {
    try {     
        const { drinkId } = req.params;
        const { content } = req.body;
        // drinkId 또는 수정된 내용이 없을 시 진행 X
        if (!drinkId || !content) {
            res.status(400).send({
                message: "drinkId 또는 content를 확인해주세요."
            });
            return;
        };

        // 댓글 내용 수정 시 'edited'는 true값으로 변경한다. 
        await Comments.updateOne({ drinkId }, { $set: { content: content, edited: true } });

        res.json({ message: 'success' });
            
    } catch (err) {
        res.status(400).send({
            message: `[댓글 수정] ${err}`
        });
    };
});

export { commentRouter };