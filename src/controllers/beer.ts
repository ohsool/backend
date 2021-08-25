import express, {Request, Response, NextFunction} from 'express';
import mongoose, { Schema, model, mongo, ObjectId } from "mongoose";
import moment from "moment";

// import Beers from "../schemas/beer";
import Beers from "../schemas/beer";
import BeerCategories from '../schemas/beerCategory';

import { IBeer } from "../interfaces/beer";
import { IBeerCategory } from '../interfaces/beerCategory';

const getBeers = async(req: Request, res: Response) => {
    try {
        const beers: IBeer = await Beers.find().lean();

        res.json({ message: "success", beers });
    } catch (error) {
        res.status(400).send({ message: "fail", error });
    }
}

// http://localhost:5209/api/beer/list/all/page?pageNo=0&sort=degree
const getSomeBeers = async(req: Request, res: Response) => {
    let { pageNo, sort } = req.query;
    let beers: Array<IBeer> = [];

    try {
        // later, we should change order of beers with the most famous sort method
        // maybe, degree or count will be the one
        if (sort == "avgRate" || sort == "createDate" || sort == "degree" || sort == "count") {
            // sort descending
            beers = await Beers.find({}).sort([[sort, -1]]);
        } else if (sort == "name_korean" || sort == "name_english") {
            // sort ascending
            beers = await Beers.find({}).sort(sort);
        } else if (sort == "createDateOld") {
            // sort ascending
            beers = await Beers.find({}).sort("createDate");
        } else if (sort == "degreeLess") {
            // sort ascending
            beers = await Beers.find({}).sort("degree");
        } else if (!sort) {
            // gives basic order
            beers = await Beers.find({})
        } else {
            res.status(400).send({ message: "fail", error: "wrong sort method" });

            return;
        }
        

        if ( Number(pageNo) < 0 || (Number(pageNo) * 8 > beers.length) ) {
            res.status(400).send({ message: "fail", error: "wrong page" });

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

const postBeer = async(req: Request, res: Response) => {
    try {
        const { name_korean, name_english, image, degree, country, isDistant, categoryId, hashtag } = req.body;
        const isExist: IBeer = await Beers.findOne({ name_korean }).lean();
        const beerCategory: IBeerCategory | null = await BeerCategories.findById(categoryId);
        
        if (res.locals.user != "ohsool") {
            res.status(401).send({ message: "fail", error: "user not authenticated" });

            return;
        }

        if (isExist) {
            res.json({ message: "fail", error: "beer already exists" });

            return;
        }

        if (!beerCategory) {
            res.json({ message: "fail", error: "wrong category" });

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

const getBeer = async(req: Request, res: Response) => {
    try {
        const { beerId } = req.params;
        const beer: IBeer = await Beers.findById(beerId).lean();
        
        if (beer) {
            res.json({ message:"success", beer });
        } else {
            res.status(400).send({ message: "fail", error: "beer does not exist in the database" });
        }
    } catch(error) {
        res.status(400).send({ message: "fail", error: "beer does not exist in the datasbase" });
    }

}

const deleteBeer = async(req: Request, res: Response) => {
    let { beerId } = req.params;
    const _id = mongoose.Types.ObjectId(beerId);

    try {
        await Beers.findOneAndDelete({ _id: _id }).lean();

        res.json({ message: "success"});
    } catch(error) {
        res.status(400).send({ message: "fail", error: "failed deleting beer from the database" });
    }
}

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
        const exists: Array<IBeer> = await Beers.find({ _id: beerId, like_array: mongoose.Types.ObjectId(userId) });
        let result: Array<IBeer> = [];

        if(exists.length) {
            await Beers.findOneAndUpdate({_id: beerId}, {$pull: {like_array: userId}}).lean();

            result = await Beers.find({_id: beerId }).lean();
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
        res.json({ message: "fail", error: "empty value" });

        return;
    }

    try {
        const beer: IBeer | null = await Beers.findById(_id);
        const new_report = [ url, name, address, userId ];

        if (!beer) {
            res.json({ message: "fail", error: "wrong beer" });

            return;
        }

        const location_report: Array<Array<String>> = beer.location_report!;
        // [[name, address, url], [name, address, url], ...]
        const locations: Array<Array<String>> = beer.location!;

        // is reported location already exist in location list?
        const found = locations.some(e => Array.isArray(e) && e.every((o, i) => Object.is(new_report[i], o)));
    
        if ( found ) {
            res.send({ message: "fail", error: "location already reported" });

            return;
        } 

        let cnt = 0;

        for (let i = 0; i < location_report.length; i ++) {
            if (new_report[0] == location_report[i][0]) {
                if ( String(new_report[3]) == String(location_report[i][3]) ) {
                    res.send({ message: "fail", error: "user already reported this location" });

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

        res.json({ message: "success", beer: new_beer });
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
    getBeerByCategory
}