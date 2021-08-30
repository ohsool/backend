import express, {Request, Response, NextFunction} from 'express';
import mongoose, { Schema, model, mongo, ObjectId } from "mongoose";
import moment from "moment";

// import Beers from "../schemas/beer";
import Beers from "../schemas/beer";
import BeerCategories from '../schemas/beerCategory';
import MyBeers from "../schemas/mybeer";

import { IBeer, IFeatures } from "../interfaces/beer";
import { IBeerCategory } from '../interfaces/beerCategory';

// 전체 리스트 출력하기
const getBeers = async(req: Request, res: Response) => {
    try {
        const beers: IBeer = await Beers.find().lean();

        res.json({ message: "success", beers });
    } catch (error) {
        res.status(400).send({ message: "fail", error });
    }
}

// 페이지별 리스트 출력하기
const getSomeBeers = async(req: Request, res: Response) => {
    let { pageNo, sort } = req.query;
    let beers: Array<IBeer> = [];

    if ( Number(pageNo) < 0 || (Number(pageNo) * 8 > beers.length) ) {
        res.status(400).send({ message: "fail", error: "wrong page" });

        return;
    }

    try {
        // later, we should change order of beers with the most famous sort method
        // maybe, degree or count will be the one
        if (sort == "avgRate" || sort == "createDate" || sort == "degree" || sort == "count") {
            // sort descending
            beers = await Beers.find({}).sort([[sort, -1]]).select("hashtag like_array name_korean name_english image");
        } else if (sort == "name_korean" || sort == "name_english") {
            // sort ascending
            beers = await Beers.find({}).sort(sort).select("hashtag like_array name_korean name_english image");
        } else if (sort == "createDateOld") {
            // sort ascending
            beers = await Beers.find({}).sort("createDate").select("hashtag like_array name_korean name_english image");
        } else if (sort == "degreeLess") {
            // sort ascending
            beers = await Beers.find({}).sort("degree").select("hashtag like_array name_korean name_english image");
        } else if (!sort) {
            // gives basic order
            beers = await Beers.find({}).select("hashtag like_array name_korean name_english image")
        } else {
            res.status(400).send({ message: "fail", error: "wrong sort method" });
            return;
        }

        const res_beers: Array<IBeer> = [];

        for (let i = Number(pageNo) * 8; i < (Number(pageNo) * 8) + 8; i ++) {
            if ( beers[i] ) {
                res_beers.push(beers[i]);
            } else {
                break;
            }
        }

        res.json({ messgae: "success", beers: res_beers });
    } catch (error) {
        res.status(400).send({ message: "fail", error });
    }
}

// 맥주 추가하기
const postBeer = async(req: Request, res: Response) => {
    try {
        const { name_korean, name_english, image, degree, country, isDistant, categoryId, hashtag } = req.body;
        const isExist: IBeer = await Beers.findOne({ name_korean }).lean();
        const beerCategory: IBeerCategory | null = await BeerCategories.findById(categoryId);
        
        if (res.locals.user != "ohsool") {
            res.status(403).send({ message: "fail", error: "user not authenticated" });

            return;
        }

        if (isExist) {
            res.status(409).json({ message: "fail", error: "beer already exists" });

            return;
        }

        if (!beerCategory) {
            res.status(406).json({ message: "fail", error: "no exist category" });

            return;
        }

        const date = moment().format("YYYY-MM-DD hh:mm A")
        const new_beer: IBeer = {
            name_korean, name_english, image, degree, country, isDistant, categoryId, features: beerCategory.features , hashtag, createDate: date
        }

        const beer = await Beers.create(new_beer);

        res.status(201).json({ message: "success", beer });
    } catch (error) {
        res.status(400).send({ message: "fail", error });
    }
}

// 맥주 하나 가져오기
const getBeer = async(req: Request, res: Response) => {
    try {
        const { beerId } = req.params;
        const beer: IBeer = await Beers.findById(beerId).lean();
        
        if (beer) {
            res.json({ message:"success", beer });
        } else {
            res.status(406).send({ message: "fail", error: "no exist beer" });
        }
    } catch(error) {
        res.status(400).send({ message: "fail", error });
    }

}

// 맥주 한 개 삭제하기
const deleteBeer = async(req: Request, res: Response) => {
    let { beerId } = req.params;
    const _id = mongoose.Types.ObjectId(beerId);

    if (res.locals.user != "ohsool") {
        res.status(403).send({ message: "fail", error: "user not authenticated" });

        return;
    }

    try {
        await Beers.findOneAndDelete({ _id: _id }).lean();

        res.status(204).json({ message: "success"});
    } catch(error) {
        res.status(400).send({ message: "fail", error });
    }
}

// 맥주 좋아요
const likeBeer = async(req: Request, res: Response) => {
    const userId = mongoose.Types.ObjectId(res.locals.user._id);
    const { beerId } = req.params;
    const _id = mongoose.Types.ObjectId(beerId);

    try {
        const exists: Array<IBeer> = await Beers.find({ _id, like_array: userId });
        let result: Array<IBeer> = [];

        if(exists.length == 0) {
            await Beers.findOneAndUpdate({_id: beerId}, {$push: {like_array: userId}}).lean();

            result = await Beers.find({_id, like_array: userId });
        } else if(exists.length) {
            res.status(409).send({ message: "fail", error: "user already liked this beer" });

            return;
        }

        res.json({ message: "success", likes: result[0].like_array });
    } catch(error) {
        res.status(400).send({ message: "fail", error });
    }
}

// 맥주 좋아요 해제
const unlikeBeer = async(req: Request, res: Response) => {
    const userId = res.locals.user._id;
    const { beerId } = req.params;

    try {
        const exists: Array<IBeer> = await Beers.find({ _id: beerId, like_array: mongoose.Types.ObjectId(userId) });
        let result: Array<IBeer> = [];

        if(exists.length) {
            await Beers.findOneAndUpdate({_id: beerId}, {$pull: {like_array: userId}}).lean();

            result = await Beers.find({_id: beerId }).lean();
        } else if(exists.length == 0) {
            res.status(409).send({ message: "fail", error: "user has never liked this beer" });

            return;
        }
        res.json({ message: "success", likes: result[0].like_array });

    } catch(error) {
        res.status(400).send({ message: "fail", error });
    }
}

// 현재 유저가 좋아요한 리스트 가져오기
const likedBeer = async(req: Request, res: Response) => {
    try {
        const userId = res.locals.user._id;

        if (!userId) {
            res.status(406).send({ message: "fail", error: "no exist user" });

            return;
        }

        const likedList: Array<IBeer> = await Beers.find({ like_array: mongoose.Types.ObjectId(userId) });

        res.json({ message:"success", likedList: likedList });
    } catch (error) {
        res.status(400).send({ message: "fail", error });
    }
}

// 장소 제보하기
const reportLocation = async(req: Request, res: Response) => {
    const { beerId, name, address, url } = req.body;
    const user = res.locals.user;
    const userId = user._id;
    const _id = mongoose.Types.ObjectId(beerId)
    
    if (!beerId || !name || !address || !url) {
        res.status(400).json({ message: "fail", error: "empty value" });

        return;
    }

    try {
        const beer: IBeer | null = await Beers.findById(_id);
        const new_report = [ url, name, address, userId ];

        if (!beer) {
            res.status(406).json({ message: "fail", error: "no exist beer" });

            return;
        }

        const location_report: Array<Array<string>> = beer.location_report!;
        // [[name, address, url], [name, address, url], ...]
        const locations: Array<Array<string>> = beer.location!;

        // is reported location already exist in location list?
        const found = locations.some(e => Array.isArray(e) && e.every((o, i) => Object.is(new_report[i], o)));
    
        if ( found ) {
            res.status(409).send({ message: "fail", error: "location already reported" });

            return;
        } 

        let cnt = 0;

        for (let i = 0; i < location_report.length; i ++) {
            if (new_report[0] == location_report[i][0]) {
                if ( String(new_report[3]) == String(location_report[i][3]) ) {
                    res.status(409).send({ message: "fail", error: "user already reported this location" });

                    return;
                }

                cnt += 1;
            }
        }

        if (cnt >= 2) {  // reported 3 times. goes to location.
            for (let i = 0; i < cnt; i ++) {
                await Beers.findOneAndUpdate({_id: beerId}, {$pull: {location_report: new_report}}).lean();
            }

            await Beers.findOneAndUpdate({_id: beerId}, {$push: {location: [new_report] }}).lean();
        } else {  // reported less than 3 times. goes to location_report.
            await Beers.findOneAndUpdate({_id: beerId}, {$push: {location_report: [new_report] }}).lean();
        }

        const new_beer: IBeer | null = await Beers.findOne({ _id: beerId });

        res.status(201).json({ message: "success", beer: new_beer });
    } catch (error) {
        res.status(400).send({ message: "fail", error });
    }
    
}

// 카테고리별 맥주 출력
const getBeerByCategory = async (req: Request, res: Response)=> {
    try {
        let categoryId = mongoose.Types.ObjectId(String(req.query.categoryId));
        let pageNo = req.query.pageNo;
        let sort = req.query.sort;
        let beers: Array<IBeer> = [];

        /* 1. 조건별 정렬 진행 */

        sort = sort ? sort : "_id"; // 'sort' 기준이 없다면 _id 기준으로 정렬 진행.

        // 오름차순 정렬 (1) createDateOld, degreeLess, name_korean,name_english
        // 내림차순 정렬 (-1) avgRate, createDate, degree, count 
        let sortOption = 1
        if (sort === "avgRate" || sort === "createDate" || sort === "degree" || sort === "count") {
            sortOption = -1
        }
        if (sort === 'degreeLess') sort = "degree"
        else if (sort === 'createDateOld') sort = "createDate"
        beers = await Beers.find({ categoryId }).sort([[sort, sortOption]]);

        if ( !beers ) {
            res.status(406).json({ message: "fail", error: "no exist category" });

            return;
        }

        /* 2. 페이지별 맥주 출력 */
        
        // 요청 페이지 번호가 0보다 작다면 0으로 대체한다.
        const curPage = (Number(pageNo) < 0) ? 0 : Number(pageNo);
        const startIndex = curPage * 8;

        // 요청 페이지의 데이터 인덱스가 실제 데이터보다 크다면 오류를 뱉는다.
        if (startIndex > beers.length) {
            res.status(400).send({ message: "fail", error: "wrong page" });
            return;
        }
        
        // 요청한 페이지 넘버에 위치하는 맥주 배열에 담기
        const res_beers: Array<IBeer> = [];
        for (let i = startIndex; i < (startIndex + 8); i++) {
            if (!beers[i]) break;
            res_beers.push(beers[i])
        }

        res.json({message: "success", beers: res_beers});

    } catch (error) {
        res.status(400).send({ message: "fail", error });
    }
}

// 유저들의 맥주 취향을 데이터베이스에 반영하기 (모든 맥주)
const getAllFeatures = async (req: Request, res: Response) => {
    const modifiedBeers: Array<IBeer> = [];

    try {
        const beers = await Beers.find({});

        for (let i = 0; i < beers.length; i ++) {
            const myBeers = await MyBeers.find({ beerId: beers[i]._id }).select("myFeatures -_id");

            if (!myBeers) {
                continue;
            }

            const count = myBeers.length;
            if (count == beers[i].calculatedCount! || count == 0) {  // same as before
                continue;
            }

            const newFeatures: IFeatures = {
                "bitter": 0,
                "crispy": 0,
                "flavor": 0,
                "sweet": 0,
                "nutty": 0
            };
    
            for (let j = 0; j < count; j ++) {
                newFeatures.bitter += myBeers[j].myFeatures.bitter;
                newFeatures.crispy += myBeers[j].myFeatures.crispy;
                newFeatures.flavor += myBeers[j].myFeatures.flavor;
                newFeatures.sweet += myBeers[j].myFeatures.sweet;
                newFeatures.nutty += myBeers[j].myFeatures.nutty;
            }
    
            newFeatures.bitter /= count;
            newFeatures.crispy /= count;
            newFeatures.flavor /= count;
            newFeatures.sweet /= count;
            newFeatures.nutty /= count;

            const beer = await Beers.findOneAndUpdate({ _id: beers[i]._id }, { $set: { features: newFeatures, calculatedCount: count } }).select("name_korean features");

            modifiedBeers.push(beer!);
        }
        
        res.status(201).json({ message: "success", modifiedBeers });
    } catch (error) {
        res.status(400).json({ message: "fail", error });
    }
}

// 유저들의 맥주 취향을 데이터베이스에 반영하기 (특정 맥주)
const getFeatures = async (req: Request, res: Response) => {
    const beerId = req.params.beerId;

    try {
        const myBeers = await MyBeers.find({ beerId }).select("myFeatures -_id");
        const beer = await Beers.findOne({ _id: beerId });
    
        if (!myBeers) {
            res.status(204).json({ message: "fail", error: "no mybeers with this beer" });
    
            return;
        }
    
        if (!beer) {
            res.status(406).json({ message: "fail", error: "no exist beer" });
    
            return;
        }
    
        const count = myBeers.length;
        if (count == beer!.calculatedCount || count == 0) {
            res.status(409).json({ message: "fail", error: "no need to update" });
    
            return;
        }
    
        const newFeatures: IFeatures = {
            "bitter": 0,
            "crispy": 0,
            "flavor": 0,
            "sweet": 0,
            "nutty": 0
        };
        
        for (let i = 0; i < count; i ++) {
            newFeatures.bitter += myBeers[i].myFeatures.bitter;
            newFeatures.crispy += myBeers[i].myFeatures.crispy;
            newFeatures.flavor += myBeers[i].myFeatures.flavor;
            newFeatures.sweet += myBeers[i].myFeatures.sweet;
            newFeatures.nutty += myBeers[i].myFeatures.nutty;
        }
    
        newFeatures.bitter /= count;
        newFeatures.crispy /= count;
        newFeatures.flavor /= count;
        newFeatures.sweet /= count;
        newFeatures.nutty /= count;
    
        const res_beer = await Beers.findOneAndUpdate({ _id: beerId }, { $set: { features: newFeatures, calculatedCount: count } }).select("name_korean features");
    
        res.status(201).json({ message: "success", beer: res_beer });
    } catch (error) {
        res.status(400).json({ message: "fail", error });
    }
}

export default {
    getBeers,
    getSomeBeers,
    postBeer,
    getBeer,
    deleteBeer,
    likeBeer,
    unlikeBeer,
    likedBeer,
    reportLocation,
    getBeerByCategory,
    getAllFeatures,
    getFeatures
}