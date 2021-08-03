import express, {Request, Response, NextFunction} from 'express';
import Beers from "../schemas/beer";
import mongoose from "mongoose";

const getBeers = async(req: Request, res: Response) => {
    try {
        const beers = await Beers.find();
        res.json({ beers });
    } catch (error) {
        res.status(400).send({ message: "failed", error });
    }
}

const postBeer = async(req: Request, res: Response) => {
    try {
        const { name_korean, name_english, image, degree, categoryId, hashtag, features } = req.body;
        const isExist = await Beers.findOne({ name_korean });

        if(isExist) {
            res.json({ message: "beer already exists" });
            return;
        }

        await Beers.create({ name_korean, name_english, image, degree, categoryId, hashtag, features });
        res.json({ message: "success" });

    } catch (error) {
        res.status(400).send({ message: "failed", error });
    }
}

const getBeer = async(req: Request, res: Response) => {
    try {
        const { beerId } = req.params;
        const beer = await Beers.findById(beerId).exec();
        if (beer) {
            res.json({ beer });
        } else {
            res.send(400).send({ message: "beer does not exist in the database" });
            return;
        }
    } catch(error) {
        res.status(400).send({ message: "beer does not exist in the datasbase" });
    }

}

const deleteBeer = async(req: Request, res: Response) => {
    const { beerId } = req.params;

    try {
        await Beers.findOneAndDelete({ _id: beerId });
        res.json({ message: "success"});
    } catch(error) {
        res.status(400).send({ message: "failed deleting beer from the database" });
    }
}

const likeBeer = async(req: Request, res: Response) => {
    const userId = res.locals.user._id;
    const { beerId } = req.params;

    try {
        const exists = await Beers.find({ like_array: mongoose.Types.ObjectId(userId) });
        console.log(exists.length)
        if(exists.length == 0) {
            await Beers.findOneAndUpdate({_id: beerId}, {$push: {like_array: userId}});
        } else if(exists.length) {
            res.status(400).send({ message: "user already liked this beer" });
            return;
        }
        res.json({ message: "success" });
    } catch(error) {
        res.status(400).send({ message: "failed", error });
    }
}

const unlikeBeer = async(req: Request, res: Response) => {
    const userId = res.locals.user._id;
    const { beerId } = req.params;

    try {
        const exists = await Beers.find({ like_array: mongoose.Types.ObjectId(userId) });
        if(exists.length) {
            await Beers.findOneAndUpdate({_id: beerId}, {$pull: {like_array: userId}});
        } else if(exists.length == 0) {
            res.status(400).send({ message: "user has never liked this beer" });
            return;
        }
        res.json({ message: "success" });
    } catch(error) {
        res.status(400).send({ message: "failed", error });
    }
}

export default {
    getBeers,
    postBeer,
    getBeer,
    deleteBeer,
    likeBeer,
    unlikeBeer
}