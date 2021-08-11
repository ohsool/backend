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
            res.status(400).send({ message: "fail", error: "beer does not exist in the database" });
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

        res.json({ message: "success", likes: result[0].like_array });
    } catch(error) {
        res.status(400).send({ message: "fail", error });
    }
}

const unlikeBeer = async(req: Request, res: Response) => {
    const userId = res.locals.user._id;
    const { beerId } = req.params;

    try {
        const exists = await Beers.find({ _id: beerId, like_array: mongoose.Types.ObjectId(userId) });
        let result;
        if(exists.length) {
            await Beers.findOneAndUpdate({_id: beerId}, {$pull: {like_array: userId}});
            result = await Beers.find({_id: beerId });
        } else if(exists.length == 0) {
            res.status(400).send({ message: "fail", error: "user has never liked this beer" });
            return;
        }
        res.json({ message: "success", likes: result[0].like_array });

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

// 장소 제보하기
const reportLocation = async(req: Request, res: Response) => {
    const { beerId, name, address, url } = req.body;
    
    if (!beerId || !name || !address || !url) {
        res.json({ message: "fail", error: "empty value" });

        return;
    }

    try {
        const beer = await Beers.findOne({ _id: beerId });
        const new_report = [ url, name, address ];

        if (!beer) {
            res.json({ message: "fail", error: "wrong beer" });

            return;
        }

        const location_report: Array<String> = beer.location_report;  // [[name, address, url], [name, address, url], ...]
        const locations: Array<String> = beer.location;

        // is reported location already exist in location list?
        const found = locations.some(e => Array.isArray(e) && e.every((o, i) => Object.is(new_report[i], o)));
    
        if ( found ) {
            res.send({ message: "fail", error: "location already reported" });

            return;
        } 

        let cnt = 0;

        for (let i = 0; i < location_report.length; i ++) {
            if (new_report[0] == location_report[i][0]) {
                cnt += 1;
            }
        }

        if (cnt >= 2) {  // reported 3 times. goes to location.
            for (let i = 0; i < cnt; i ++) {
                await Beers.findOneAndUpdate({_id: beerId}, {$pull: {location_report: new_report}});
            }

            await Beers.findOneAndUpdate({_id: beerId}, {$push: {location: [new_report] }});
        } else {  // reported less than 3 times. goes to location_report.
            await Beers.findOneAndUpdate({_id: beerId}, {$push: {location_report: [new_report] }});
        }

        const new_beer = await Beers.findOne({ _id: beerId });

        res.json({ message: "success", beer: new_beer });
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
    likedBeer,
    reportLocation
}