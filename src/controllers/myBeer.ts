import express, {Request, Response, NextFunction} from 'express';
import moment from "moment";
import mongoose, { Schema, model, mongo, ObjectId } from "mongoose";

import MyBeer from "../schemas/mybeer";
import Beers from "../schemas/beer";
import BeerCategory from "../schemas/beerCategory";
import { IBeer } from '../interfaces/beer';

interface avgRate {
    [key: string]: Array<number>
}

// 도감 업로드하기
const postMyBeer = async (req: Request, res: Response) => {
    let { myFeatures, location, rate, review } = req.body;
    const { beerId } = req.params;
    const _id = mongoose.Types.ObjectId(beerId);
    rate = Math.round(rate);

    if (!beerId || !myFeatures || !rate) {
        res.json({ message: "fail", error: "Either beer or myFeatures or rate doesn't exist." });

        return;
    } else if (!location) {
        location = "";
    }

    if (rate < 1 || rate > 5) {     // 평점이 1 이상 5 이하인지 확인
        res.json({ message: "fail", error: "please input rate 1~4" });

        return;
    }

    if (String(review).length > 48) {   // 리뷰가 48자 이하인지 확인
        res.json({ message: "fail", error: "the length of the review must be under 48" });

        return;
    }

    const userId = res.locals.user._id;
    const date = moment().format("YYYY-MM-DD hh:mm A")

    try {
        // if the user already write review of this beer, reject it
        const exist = await MyBeer.findOne({ beerId, userId }).lean();

        if (exist) {
            res.json({ message: "fail", error: "the user already made review of this beer" });

            return;
        }
    } catch (error) {
        res.json({ message: "fail", error });

        return;
    }

    const features = ["bitter", "crispy", "flavor", "sweet", "nutty"];

    // If there is no value in features, set to 1
    for (let i = 0; i < features.length; i ++) {
        if (!myFeatures[features[i]]) {
            myFeatures[features[i]] = 1;
        }
    }

    const beer: IBeer | null = await Beers.findById(_id);
    if (!beer) {
        res.json({ message: "fail", error: "beer doesn't exist" });

        return;
    }

    try {
        const myPreference = res.locals.user.preference;
        let mybeer = await MyBeer.create({ beerId, userId, preference: myPreference, myFeatures, date, location, rate, review});
        const myBeerId = mybeer._id;

        const beerCategoryId = beer.categoryId;
        
        const beerCategory = await BeerCategory.findOne({ _id: beerCategoryId }).lean();
        const avg = beerCategory.avgRate[myPreference][0];
        const count = beerCategory.avgRate[myPreference][1];

        const new_avgRate = (( avg * count ) + rate) / (count + 1);

        let avgRate = beerCategory.avgRate;

        avgRate[myPreference][0] = new_avgRate;
        avgRate[myPreference][1] = count + 1;


        await BeerCategory.findOneAndUpdate({ _id: beerCategoryId }, {$set: { avgRate }}).lean();

        const beerCount: number = Number(beer.count)!;
        const beerAvgRate: number = Number(beer.avgRate)!;

        const newBeerAvgRate = (( beerCount * beerAvgRate) + rate) / (beerCount + 1);

        await Beers.findOneAndUpdate({ _id: beerId }, { $set: { avgRate: newBeerAvgRate, count: beerCount + 1 } }).lean();

        mybeer = await MyBeer.findOne({ _id: mybeer._id }).populate({path: 'userId', select: 'nickname'}).lean();

        res.send({ message: "success", mybeer });
    } catch (error) {
        res.json({ message: "fail", error });

        return;
    }
};

// 모든 유저의 도감 가져오기
const getAllMyBeers = async (req: Request, res: Response) => {
    try {
        const mybeers = await MyBeer.find({}).populate({path: 'userId', select: 'nickname'}).lean().populate({ path: 'beerId', select: 'image' });
        res.json({ message: "success", mybeers });
    } catch (error) {

        res.json({ message: "fail", error });
    }
};

// 현재 유저의 도감 가져오기
const getCurrentMyBeers = async (req: Request, res: Response) => {
    const userId = res.locals.user._id;
    try {
        const mybeers = await MyBeer.find({ userId }).populate({path: 'userId', select: 'nickname'}).lean().populate({ path: 'beerId', select: 'image' });

        res.json({ message: "success", mybeers });
    } catch (error) {
        res.json({ message: "fail", error });
    }
    
};

// 특정 맥주의 전체 도감 가져오기
const getBeerAllReviews = async (req: Request, res: Response) => {
    try {
        const { beerId } = req.params;
        const beer = await Beers.findOne({ _id: beerId }).lean();

        if (!beer) {
            res.json({ message: "fail", error: "beer doesn't exist" });

            return;
        }
        const mybeers = await MyBeer.find({ beerId: beer._id }).lean().populate({path: 'userId', select: 'nickname'}).populate({ path: 'beerId', select: 'image' });

        res.json({ message: "success", mybeers });
    } catch (error) {
        res.json({ message: "fail", error });

        return;
    }
};

// 특정 도감의 상세 정보 가져오기
const getMyBeer = async (req: Request, res: Response) => {
    const { myBeerId } = req.params;
    try {
        const mybeer = await MyBeer.findOne({ _id: myBeerId }).lean().populate({path: 'userId', select: 'nickname'}).populate({ path: 'beerId', select: 'image' });

        if (!mybeer) {
            res.json({ message: "fail", error: "no existed mybeer" });

            return;
        }

        res.json({ message: "success", mybeer });
    } catch (error) {
        res.json({ message: "fail", error });
    }
};

// 특정 도감 수정하기
const updateMyBeer = async (req: Request, res: Response) => {
    const { myBeerId } = req.params;
    const { myFeatures, location, rate, review } = req.body;

    try {
        const myBeer = await MyBeer.findOne({ _id: myBeerId }).lean();
        const userId = res.locals.user._id;

        if (rate < 1 || rate > 5) {
            res.json({ message: "fail", error: "please input rate 1~4" });
    
            return;
        }

        if (!myBeer) {
            res.json({  message: "fail", error: "wrong mybeer id" });

            return;
        }

        const features = ["bitter", "crispy", "flavor", "sweet", "nutty"];

        // If there is no value in features, set to 1
        for (let i = 0; i < features.length; i ++) {
            if (!myFeatures[features[i]]) {
                myFeatures[features[i]] = 1;
            }
        }
    
        if (String(myBeer.userId) !== String(userId)) {
            res.json({  message: "fail", error: "not the same user" });

            return;
        }

        const beerId = myBeer.beerId;
        const beer: IBeer = await Beers.findOne({ _id: beerId }).lean();
    
        const mybeer = await MyBeer.findOneAndUpdate({ _id: myBeerId }, { $set: { beerId, myFeatures, location, rate, review } }).lean();

        // category rate
        const myPreference = mybeer.preference;
        const beerCategoryId = beer.categoryId;
        const rateOld = myBeer.rate;

        const beerCategory = await BeerCategory.findOne({ _id: beerCategoryId }).lean();
        const avgRate_ = beerCategory.avgRate[myPreference][0];
        const count = beerCategory.avgRate[myPreference][1];

        const new_avgRate = ((count * avgRate_) - rateOld + rate ) / count;

        const avgRate = beerCategory.avgRate;

        avgRate[myPreference][0] = new_avgRate;
        avgRate[myPreference][1] = count;

        await BeerCategory.findOneAndUpdate({ _id: beerCategoryId }, {$set: { avgRate }}).lean();
        
        // beer rate
        const beerCount = Number(beer.count);
        const beerAvgRate = Number(beer.avgRate);

        const newBeerAvgRate = ( (beerCount * beerAvgRate) - rateOld + rate) / beerCount;

        await Beers.findOneAndUpdate({ _id: beerId }, { $set: { avgRate: newBeerAvgRate } }).lean();

        res.json({ message: "success", myBeerId });
    } catch (error) {
        res.json({ message: "fail", error })
    }
};

// 특정 도감 삭제하기
const deleteMyBeer = async (req: Request, res: Response) => {
    const { myBeerId } = req.params;

    try {
        const mybeer = await MyBeer.findOne({ _id: myBeerId }).lean();
        const userId = res.locals.user._id;

        if (String(mybeer.userId) !== String(userId)) {
            res.json({ message: "fail", error: "not the same user" });
            return;
        }

        if (!mybeer) {
            res.json({  message: "fail", error: "wrong mybeer id" });

            return;
        }

        await MyBeer.deleteOne({ _id: myBeerId }).lean();

        // delete beer category rate
        const myPreference = mybeer.preference;
        const beer: IBeer = await Beers.findOne({ _id: mybeer.beerId }).lean();
        const beerCategoryId = beer.categoryId;
        const rate = mybeer.rate;
        
        const beerCategory = await BeerCategory.findOne({ _id: beerCategoryId }).lean();
        const avgRate = beerCategory.avgRate;
        
        const avg = avgRate[myPreference][0];
        const count = avgRate[myPreference][1];

        if (Number(count) > 1) {
            const new_avgRate = (( avg * count ) - rate) / (count - 1);

            avgRate[myPreference][0] = new_avgRate;
            avgRate[myPreference][1] = count - 1;
        }

        await BeerCategory.findOneAndUpdate({ _id: beerCategoryId }, {$set: { avgRate }}).lean();

        // delete beer rate
        const beerCount = Number(beer.count);
        const beerAvgRate = Number(beer.avgRate);

        let newBeerAvgRate = 0

        if (beerCount > 1) {
            newBeerAvgRate = (( beerCount * beerAvgRate) - rate) / (beerCount - 1);
        }

        await Beers.findOneAndUpdate({ name_korean: beer.name_korean }, { $set: { avgRate: newBeerAvgRate, count: beerCount - 1 } }).lean();

        res.json({ message: "success" });
    } catch (error) {
        res.json({ message: "fail", error });
    }
};



export default {
    postMyBeer,
    getAllMyBeers,
    getCurrentMyBeers,
    getBeerAllReviews,
    getMyBeer,
    updateMyBeer,
    deleteMyBeer
}

