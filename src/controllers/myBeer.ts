import express, {Request, Response, NextFunction} from 'express';
import moment from "moment";
import mongoose, { Schema, model, mongo, ObjectId } from "mongoose";

import MyBeer from "../schemas/mybeer";
import Beers from "../schemas/beer";
import BeerCategory from "../schemas/beerCategory";
import Users from "../schemas/user";
import { IBeer } from '../interfaces/beer';
import { IBeerCategory } from '../interfaces/beerCategory';
import { IMyBeer } from '../interfaces/mybeer';
import { constants } from 'node:buffer';

async function calculateRates() {

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

    if (review.length > 300) {   // 리뷰가 200 이하인지 확인
        res.json({ message: "fail", error: "the length of the review must be under 300" });

        return;
    }

    const userId = res.locals.user._id;
    const date = moment().format("YYYY-MM-DD hh:mm A")

    try {
        // if the user already write review of this beer, reject it
        const exist: IMyBeer | null = await MyBeer.findOne({ beerId, userId }).lean();

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

        const beerCategoryId = beer.categoryId;
        
        const beerCategory: IBeerCategory = await BeerCategory.findOne({ _id: beerCategoryId }).lean();
        const avg = beerCategory.avgRate![myPreference][0];
        const count = beerCategory.avgRate![myPreference][1];

        const new_avgRate = (( avg * count ) + rate) / (count + 1);

        const avgRate = beerCategory.avgRate!;

        avgRate[myPreference][0] = new_avgRate;
        avgRate[myPreference][1] = count + 1;

        await BeerCategory.findOneAndUpdate({ _id: beerCategoryId }, {$set: { avgRate }}).lean();

        const beerCount = beer.count!;
        const beerAvgRate = beer.avgRate!;

        const newBeerAvgRate = (( beerCount * beerAvgRate) + rate) / (beerCount + 1);

        await Beers.findOneAndUpdate({ _id: beerId }, { $set: { avgRate: newBeerAvgRate, count: beerCount + 1 } }).lean();

        mybeer = await MyBeer.findOne({ _id: mybeer._id }).populate({path: 'userId', select: 'nickname image'}).lean();

        res.json({ message: "success", mybeer });
    } catch (error) {
        res.json({ message: "fail", error });

        return;
    }
};

// 모든 유저의 도감 가져오기
const getAllMyBeers = async (req: Request, res: Response) => {
    try {
        // 내림차순 정렬 (-1) rate, date, like 
        const { sort, pageNo } = req.query; 

        if(sort==='like') {

        }

        const beers = await MyBeer.find({})
                                .populate({path: 'userId', select: 'nickname image'})
                                .populate({ path: 'beerId', select: 'image' })
                                .sort([[sort, -1]])
                                .lean();

        const mybeers = pagination(Number(pageNo), beers)
        if (mybeers === 'wrong page') {
            res.status(400).send({ message: "fail", error: "wrong page" });
            return
        }
        res.json({ message: "success", mybeers });
    } catch (error) {
        res.json({ message: "fail", error });
    }
};

// 현재 유저의 도감 가져오기
const getCurrentMyBeers = async (req: Request, res: Response) => {
    const userId = res.locals.user._id;
    // 내림차순 정렬 (-1) rate, date, like 
    const { sort, pageNo } = req.query; 
    try {
        const beers = await MyBeer.find({ userId })
                                    .populate({path: 'userId', select: 'nickname image'})
                                    .populate({ path: 'beerId', select: 'image' })
                                    .sort([[sort, -1]])
                                    .lean();
        
        const mybeers = pagination(Number(pageNo), beers)
        if (mybeers === 'wrong page') {
            res.status(400).send({ message: "fail", error: "wrong page" });
            return
        }
        res.json({ message: "success", mybeers });

    } catch (error) {
        res.json({ message: "fail", error });
    }
    
};

// 특정 유저가 작성한 맥주도감 개수 가져오기
const getLengthOfMyBeers = async (req: Request, res: Response) => {
    const userId = req.params.userId;

    try {
        const user = await Users.findById(userId);

        if (!user) {
            res.json({ message: "fail", error: "no exist user" });

            return;
        }

        const mybeers = await MyBeer.find({ userId });

        const length = mybeers.length;

        res.json({ message: "success", length });
    } catch (error) {
        res.json({ message: "fail", error });
    }
};


//  특정 유저의 맥주도감 및 좋아요 리스트 가져오기
const getUserMyBeers = async (req: Request, res: Response) => {
    try {
        /*
        userId: 조회를 원하는 사용자의 아이디
        sort: 정렬 기준 ( 내림차순 (-1) rate, date, like_count)
        pageNo: 페이지 번호
        type: tab 종류 (beer / liked)
        */

        const { sort, pageNo, type } = req.query; 
        const userId = mongoose.Types.ObjectId(req.params.userId); 
        
        let beers!:Array<any>;

        if (!userId) {
            res.status(400).send({ message: "fail", error: "unavailable user Id" });
            return
        }

        // 01. 작성한 맥주 도감 리스트
        if (type === 'beer') {
            beers = await MyBeer        
                .find({ userId: userId }, {preference: false, location: false} )
                .populate({path: 'userId', select: 'nickname image'})
                .populate({ path: 'beerId', select: 'image name_korean'})
                .sort([[sort, -1]])
                .lean();
        } else if (type === 'liked') {
        // 02. 좋아요한 맥주 리스트
            beers = await Beers.find({like_array: { $in: [userId] }}, {
                name_korean: true, name_english: true, image: true, hashtag: true, _id: true, like_array: true
            }).sort([[sort, -1]]).lean();
        } else {
            res.status(400).send({ message: "fail", error: "wrong type" });
            return 
        }
        // console.log(type, beers, userId)

        const mybeers = pagination(Number(pageNo), beers)
        if (mybeers === 'wrong page') {
            res.status(400).send({ message: "fail", error: "wrong page" });
            return
        };

        res.json({ message: "success", mybeers });

    } catch (error) {
        res.json({ message: "fail", error });
    };                           
};


// 특정 맥주의 전체 도감 가져오기
const getBeerAllReviews = async (req: Request, res: Response) => {
    try {
        // 내림차순 정렬 (-1) rate, date, like 
        const { beerId, sort, pageNo } = req.query; 
        const beer = await Beers.findOne({ _id: beerId }).lean();

        if (!beer) {
            res.json({ message: "fail", error: "beer doesn't exist" });
            return;
        }

        const beers = await MyBeer.find({ beerId: beer._id })
                                .populate({path: 'userId', select: 'nickname image'})
                                .populate({ path: 'beerId', select: 'image' })
                                .sort([[sort, -1]])
                                .lean()

        const mybeers = pagination(Number(pageNo), beers)
        if (mybeers === 'wrong page') {
            res.status(400).send({ message: "fail", error: "wrong page" });
            return
        }

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
        const mybeer = await MyBeer.findOne({ _id: myBeerId }).lean().populate({path: 'userId', select: 'nickname image'}).populate({ path: 'beerId', select: 'image' });

        if (!mybeer) {
            res.json({ message: "fail", error: "no exist mybeer" });

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
        const nickname = res.locals.user.nickname;

        if (rate < 1 || rate > 5) {
            res.json({ message: "fail", error: "please input rate 1~4" });
    
            return;
        }

        if (review.length > 300) {   // 리뷰가 300 이하인지 확인
            res.json({ message: "fail", error: "the length of the review must be under 300" });
    
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

        if (nickname != "ohsool" && String(myBeer.userId) != String(userId)) {
            res.json({  message: "fail", error: "not the same user" });

            return;
        }

        const beerId = myBeer.beerId;
        const beer: IBeer = await Beers.findOne({ _id: beerId }).lean();
    
        const mybeer: IMyBeer = await MyBeer.findOneAndUpdate({ _id: myBeerId }, { $set: { beerId, myFeatures, location, rate, review } }).lean();

        const myPreference = mybeer.preference;
        const beerCategoryId = beer.categoryId;
        const rateOld = myBeer.rate;

        const beerCategory: IBeerCategory = await BeerCategory.findOne({ _id: beerCategoryId }).lean();
        const avgRate_ = beerCategory.avgRate![myPreference][0];
        const count = beerCategory.avgRate![myPreference][1];

        const new_avgRate = ((count * avgRate_) - +rateOld + rate ) / count;

        const avgRate = beerCategory.avgRate!;

        avgRate[myPreference][0] = new_avgRate;
        avgRate[myPreference][1] = count;

        await BeerCategory.findOneAndUpdate({ _id: beerCategoryId }, {$set: { avgRate }}).lean();
        
        const beerCount = beer.count!;
        const beerAvgRate = beer.avgRate!;

        const newBeerAvgRate = ( (beerCount * beerAvgRate) - +rateOld + rate) / beerCount;

        await Beers.findOneAndUpdate({ _id: beerId }, { $set: { avgRate: newBeerAvgRate } }).lean();

        res.json({ message: "success", myBeerId, myBeer });
    } catch (error) {
        res.json({ message: "fail", error })
    }
};

// 특정 도감 삭제하기
const deleteMyBeer = async (req: Request, res: Response) => {
    const { myBeerId } = req.params;

    try {
        const mybeer: IMyBeer = await MyBeer.findOne({ _id: myBeerId }).lean();
        const userId = mongoose.Types.ObjectId(res.locals.user._id);
        const nickname = res.locals.user.nickname;

        if (nickname != "ohsool" && String(mybeer.userId) != String(userId)) {
            res.json({ message: "fail", error: "not the same user" });
            return;
        }

        if (!mybeer) {
            res.json({  message: "fail", error: "wrong mybeer id" });

            return;
        }

        await MyBeer.deleteOne({ _id: myBeerId }).lean();

        // delete beer category rate
        const myPreference: any = mybeer.preference;   // this should not be any
        const beer: IBeer = await Beers.findOne({ _id: mybeer.beerId }).lean();
        const beerCategoryId = beer.categoryId;
        const rate = mybeer.rate;
        
        const beerCategory: IBeerCategory = await BeerCategory.findOne({ _id: beerCategoryId }).lean();
        const avgRate = beerCategory.avgRate!;
        
        const avg = avgRate[myPreference][0];
        const count = avgRate[myPreference][1];

        if (count > 1) {
            const new_avgRate = (( avg * count ) - +rate) / (count - 1);

            avgRate[myPreference][0] = new_avgRate;
            avgRate[myPreference][1] = count - 1;
        }

        await BeerCategory.findOneAndUpdate({ _id: beerCategoryId }, {$set: { avgRate }}).lean();

        const beerCount = beer.count!;
        const beerAvgRate = beer.avgRate!;

        let newBeerAvgRate = 0

        if (beerCount > 1) {
            newBeerAvgRate = (( beerCount * beerAvgRate) - +rate) / (beerCount - 1);
        }

        await Beers.findOneAndUpdate({ name_korean: beer.name_korean }, { $set: { avgRate: newBeerAvgRate, count: beerCount - 1 } }).lean();

        res.json({ message: "success", userId: res.locals.user._id });
    } catch (error) {
        res.json({ message: "fail", error });
    }
};

// 마이비어 좋아요
const likeMyBeer = async (req: Request, res: Response) => {
    const { myBeerId } = req.params;
    const userId = mongoose.Types.ObjectId(res.locals.user._id);

    const isExist = await MyBeer.findOne({ _id: myBeerId, like_array: { $in: [userId] }});
    if(isExist) {   // 이미 좋아요한 내역이 있으면 함수 종료
        res.status(400).send({ message: "fail", error: "user already liked this beer" });
        return
    }

    const result = await MyBeer.findOneAndUpdate({_id: myBeerId}, { $push: {like_array: userId}, $inc: {like_count: 1} })
                                .lean();
    res.json({ message: "success", result });

};

// 마이비어 좋아요 취소
const unlikeMyBeer = async (req: Request, res: Response) => {
    const { myBeerId } = req.params;
    const userId = mongoose.Types.ObjectId(res.locals.user._id);

    const isExist = await MyBeer.findOne({ _id: myBeerId, like_array: { $in: [userId] }});
    if(!isExist) {   // 좋아요한 내역이 없으면 함수 종료
        res.status(400).send({ message: "fail", error: "user hasn't liked this beer" });
        return
    }

    const result = await MyBeer.findOneAndUpdate({_id: myBeerId}, {$pull: {like_array: userId},  $inc: {like_count: -1}}).lean();
    res.json({ message: "success", result });
};


function pagination(pageNo:number, arrBeer:Array<any>) {

    if (!pageNo) { // 페이지번호가 없을 시 전체 리스트 출력
        return arrBeer;
    }

    const curPage = (pageNo < 0) ? 0 : pageNo;
    const startIndex = curPage * 8;

    if (startIndex > arrBeer.length) {
        return "wrong page"
    }

    const res_beers: Array<IBeer> = [];
    for (let i = startIndex; i < (startIndex + 8); i++) {
        if (!arrBeer[i]) break;
        res_beers.push(arrBeer[i])
    }

    return res_beers;
}



export default {
    postMyBeer,
    getAllMyBeers,
    getCurrentMyBeers,
    getUserMyBeers,
    getLengthOfMyBeers,
    getBeerAllReviews,
    getMyBeer,
    updateMyBeer,
    deleteMyBeer,
    likeMyBeer,
    unlikeMyBeer
}

