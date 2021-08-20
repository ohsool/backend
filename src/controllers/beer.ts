import express, {Request, Response, NextFunction} from 'express';
import Beers from "../schemas/beer";
import mongoose from "mongoose";

const getBeers = async(req: Request, res: Response) => {
    try {
        const beers = await Beers.find().lean();

        res.json({ message: "success", beers });
    } catch (error) {
        res.status(400).send({ message: "fail", error });
    }
}

const getSomeBeers = async(req: Request, res: Response) => {
    let { pageNo } = req.params;

    try {
        const beers = await Beers.find({}).lean();

        if ( Number(pageNo) < 0 || (Number(pageNo) * 8 > beers.length) ) {
            res.status(400).send({ message: "fail", error: "wrong page" });

            return;
        }

        const res_beers = [];

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
        const { name_korean, name_english, image, degree, categoryId, hashtag, features } = req.body;
        const isExist = await Beers.findOne({ name_korean }).lean();

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
        const beer = await Beers.findById(beerId).lean();
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
    const { beerId } = req.params;

    try {
        await Beers.findOneAndDelete({ _id: beerId }).lean();

        res.json({ message: "success"});
    } catch(error) {
        res.status(400).send({ message: "fail", error: "failed deleting beer from the database" });
    }
}

const likeBeer = async(req: Request, res: Response) => {
    const userId = res.locals.user._id;
    const { beerId } = req.params;

    try {
        const exists = await Beers.find({_id: beerId, like_array: mongoose.Types.ObjectId(userId) }).lean();
        let result;

        if(exists.length == 0) {
            await Beers.findOneAndUpdate({_id: beerId}, {$push: {like_array: userId}}).lean();

            result = await Beers.find({_id: beerId, like_array: mongoose.Types.ObjectId(userId) }).lean();
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
        const exists = await Beers.find({ _id: beerId, like_array: mongoose.Types.ObjectId(userId) }).lean();
        let result;

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

        const likedList = await Beers.find({ like_array: mongoose.Types.ObjectId(userId) }).lean();

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
    
    if (!beerId || !name || !address || !url) {
        res.json({ message: "fail", error: "empty value" });

        return;
    }

    try {
        const beer = await Beers.findOne({ _id: beerId }).lean();
        const new_report = [ url, name, address, userId ];

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

        const new_beer = await Beers.findOne({ _id: beerId });

        res.json({ message: "success", beer: new_beer });
    } catch (error) {
        res.status(400).send({ message: "fail", error });
    }
    
}

const getBeerByCategory = async (req: Request, res: Response)=> {
    try {
        const { categoryId } = req.params;
        const beers = await Beers.find({ categoryId }).lean();

        res.json({message: "success", beers});
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