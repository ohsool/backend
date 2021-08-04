import express, {Request, Response, NextFunction} from 'express';
import Beers from "../schemas/beer";
import mongoose from "mongoose";
import beer from '../schemas/beer';

const getBeers = async(req: Request, res: Response) => {
    try {
        const beers = await Beers.find();
        res.json({ message: "success", beers });
    } catch (error) {
        res.status(400).send({ message: "fail", error });
    }
}

const postBeer = async(req: Request, res: Response) => {
    try {
        const { name_korean, name_english, image, degree, categoryId, hashtag, features } = req.body;
        const isExist = await Beers.findOne({ name_korean });

        if(isExist) {
            res.json({ message: "fail", error: "beer already exists" });
            return;
        }

        const beer = await Beers.create({ name_korean, name_english, image, degree, categoryId, hashtag, features });
        res.status(201).json({ message: "success", beer });

    } catch (error) {
        res.status(400).send({ message: "fail", error });
    }
}

const getBeer = async(req: Request, res: Response) => {
    try {
        const { beerId } = req.params;
        const beer = await Beers.findById(beerId).exec();
        if (beer) {
            res.json({ message:"success", beer });
        } else {
            res.send(400).send({ message: "fail", error: "beer does not exist in the database" });
            return;
        }
    } catch(error) {
        res.status(400).send({ message: "fail", error: "beer does not exist in the datasbase" });
    }

}

const deleteBeer = async(req: Request, res: Response) => {
    const { beerId } = req.params;

    try {
        await Beers.findOneAndDelete({ _id: beerId });
        res.json({ message: "success"});
    } catch(error) {
        res.status(400).send({ message: "fail", error: "failed deleting beer from the database" });
    }
}

const likeBeer = async(req: Request, res: Response) => {
    const userId = res.locals.user._id;
    const { beerId } = req.params;
    //beer.ts
    try {
        const exists = await Beers.find({_id: beerId, like_array: mongoose.Types.ObjectId(userId) });
        let result;
        if(exists.length == 0) {
            await Beers.findOneAndUpdate({_id: beerId}, {$push: {like_array: userId}});
            result = await Beers.find({_id: beerId, like_array: mongoose.Types.ObjectId(userId) });
        } else if(exists.length) {
            res.status(400).send({ message: "fail", error: "user already liked this beer" });
            return;
        }

        res.json({ message: "success", likes: result.like_array });
    } catch(error) {
        res.status(400).send({ message: "fail", error });
    }
}

const unlikeBeer = async(req: Request, res: Response) => {
    const userId = res.locals.user._id;
    const { beerId } = req.params;

    try {
        const exists = await Beers.find({ _id: beerId, like_array: mongoose.Types.ObjectId(userId) });
        let result
        if(exists.length) {
            await Beers.findOneAndUpdate({_id: beerId}, {$pull: {like_array: userId}});
            result = Beers.find({_id: beerId, like_array: mongoose.Types.ObjectId(userId) });
        } else if(exists.length == 0) {
            res.status(400).send({ message: "fail", error: "user has never liked this beer" });
            return;
        }

        res.json({ message: "success", likes: result.like_array });

    } catch(error) {
        res.status(400).send({ message: "fail", error });
    }
}

// 현재 유저가 찜한 리스트 가져오기
const likedBeer = async(req: Request, res: Response) => {
    try {
        const userId = res.locals.user._id;
        if (!userId) {
            res.status(400).send({ message: "fail", error: "userId doesn't exist" });
        }
        const likedList = await Beers.find({ like_array: mongoose.Types.ObjectId(userId) });
        res.json({ message:"success", likedList: likedList });
    } catch (error) {
        res.status(400).send({ message: "fail", error });
    }
}

export default {
    getBeers,
    postBeer,
    getBeer,
    deleteBeer,
    likeBeer,
    unlikeBeer,
    likedBeer
}