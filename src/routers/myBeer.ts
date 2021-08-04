import express, {Request,Response,NextFunction,Router,response,} from "express";
import moment from "moment";

import MyBeer from "../schemas/mybeer";
import Beers from "../schemas/beer";
import { authMiddleware } from "../middlewares/auth-middleware";
import BeerCategory from "../schemas/beerCategory";

const myBeerRouter = express.Router();

interface avgRate {
    [key: string]: Array<number>
}

// post myBeer
myBeerRouter.post("/", authMiddleware, async (req, res) => {
    let { beer, myFeatures, location, rate, review } = req.body;

    if (!beer || !myFeatures || !rate) {
        res.json({ message: "fail", error: "Either beer or myFeatures or rate doesn't exist." });

        return;
    } else if (!location) {
        location = "";
    }

    if (String(review).length > 48) {
        res.json({ message: "fail", error: "the length of the review must be under 48" });

        return;
    }

    const features = ["bitter", "crispy", "flavor", "sweet", "nutty"];

    // If there is no value in features, set to 0
    for (let i = 0; i < features.length; i ++) {
        if (!myFeatures[features[i]]) {
            myFeatures[features[i]] = 1;
        }
    }

    const beer_ = await Beers.findOne({ name_korean: beer });
    if (!beer_) {
        res.json({ message: "fail", error: "beer doesn't exist" });

        return;
    }
    const beerId = beer_._id;

    const userId = res.locals.user._id;
    const date = moment().format("YYYY-MM-DD hh:mm A")

    try {
        const myBeer = await MyBeer.create({ beerId, userId, myFeatures, date, location, rate, review});
        const myBeerId = myBeer._id;

        const myPreference = res.locals.user.preference;
        const beer_ = await Beers.findOne({ name_korean: beer });
        const beerCategoryId = beer_.categoryId;
        
        const beerCategory = await BeerCategory.findOne({ _id: beerCategoryId });
        const avg = beerCategory.avgRate[myPreference][0];
        const count = beerCategory.avgRate[myPreference][1];

        const new_avgRate = (( avg * count ) + rate) / (count + 1);

        let avgRate: avgRate = {
            "American Lager": [0, 0],
            "Pilsner": [0, 0],
            "Pale Ale": [0, 0],
            "IPA": [0, 0],
            "Weizen": [0, 0],
            "Dunkel": [0, 0],
            "Stout": [0, 0],
            "Bock": [0, 0],
            "Unknown": [0, 0]
        }

        avgRate[myPreference][0] = new_avgRate;
        avgRate[myPreference][1] = count + 1;

        await BeerCategory.findOneAndUpdate({ _id: beerCategoryId }, {$set: { avgRate }});

        const beerCount = beer_.count;
        const beerAvgRate = beer_.avgRate;

        const newBeerAvgRate = (( beerCount * beerAvgRate) + rate) / (beerCount + 1);

        await Beers.findOneAndUpdate({ name_korean: beer }, { $set: { avgRate: newBeerAvgRate, count: beerCount + 1 } });

        res.send({ message: "success", myBeerId });
    } catch (error) {
        res.json({ message: "fail", error });

        return;
    }
});

// get all mybeers
myBeerRouter.get("/all", authMiddleware, async (req, res) => {
    try {
        const mybeers = await MyBeer.find({}).populate({path: 'userId', select: 'nickname'});

        res.json({ message: "success", mybeers });
    } catch (error) {

        res.json({ message: "fail", error });
    }
    
});

// get my mybeers
myBeerRouter.get("/my", authMiddleware, async (req, res) => {
    const userId = res.locals.user._id;
    try {
        const mybeers = await MyBeer.find({ userId }).populate({path: 'userId', select: 'nickname'});

        res.json({ message: "success", mybeers });
    } catch (error) {
        res.json({ message: "fail", error });
    }
});

// get one beer's mybeers
myBeerRouter.get("/beer", async (req, res) => {
    const beerName = req.body.beer;

    try {
        const beer = await Beers.findOne({ name_korean: beerName });

        if (!beer) {
            res.json({ message: "fail", error: "beer doesn't exist" });

            return;
        }

        const myBeers = await MyBeer.find({ beerId: beer._id }).populate({path: 'userId', select: 'nickname'});

        res.json({ message: "success", myBeers });
    } catch (error) {
        res.json({ message: "fail", error });

        return;
    }
    
})

// get one mybeer
myBeerRouter.get("/:myBeerId", authMiddleware, async (req, res) => {
    const myBeerId = req.params.myBeerId;

    try {
        const mybeer = await MyBeer.findOne({ _id: myBeerId }).populate({path: 'userId', select: 'nickname'});

        res.json({ message: "success", mybeer });
    } catch (error) {
        res.json({ message: "fail", error });
    }
});

// modify one mybeer
myBeerRouter.put("/:myBeerId", authMiddleware, async (req, res) => {
    const myBeerId = req.params.myBeerId;

    const { beer, myFeatures, location, rate, review } = req.body;

    try {
        const myBeer = await MyBeer.findOne({ _id: myBeerId });
        const userId = res.locals.user._id;
    
        if (String(myBeer.userId) != String(userId)) {
            res.json({  message: "fail", error: "not the same user" });

            return;
        }
    
        const beer_ = await Beers.findOne({ name_korean: beer });
        const beerId = beer_._id;
    
        await MyBeer.findOneAndUpdate({ _id: myBeerId }, { $set: { beerId, myFeatures, location, rate, review } });

        // category rate
        const myPreference = res.locals.user.preference;
        const beerCategoryId = beer_.categoryId;
        const rateOld = myBeer.rate;

        const beerCategory = await BeerCategory.findOne({ _id: beerCategoryId });
        const avgRate_ = beerCategory.avgRate[myPreference][0];
        const count = beerCategory.avgRate[myPreference][1];

        const new_avgRate = ((count * avgRate_) - rateOld + rate ) / count;

        let avgRate: avgRate = {
            "American Lager": [0, 0],
            "Pilsner": [0, 0],
            "Pale Ale": [0, 0],
            "IPA": [0, 0],
            "Weizen": [0, 0],
            "Dunkel": [0, 0],
            "Stout": [0, 0],
            "Bock": [0, 0],
            "Unknown": [0, 0]
        }

        avgRate[myPreference][0] = new_avgRate;
        avgRate[myPreference][1] = count;

        await BeerCategory.findOneAndUpdate({ _id: beerCategoryId }, {$set: { avgRate }});
        
        // beer rate
        const beerCount = beer_.count;
        const beerAvgRate = beer_.avgRate;

        const newBeerAvgRate = ( (beerCount * beerAvgRate) - rateOld + rate) / beerCount;

        await Beers.findOneAndUpdate({ name_korean: beer_.name_korean }, { $set: { avgRate: newBeerAvgRate } });

        res.json({ message: "success", myBeerId });
    } catch (error) {
        res.json({ message: "fail", error })
    }

    
});

// delete one mybeer
myBeerRouter.delete("/:myBeerId", authMiddleware, async (req, res) => {
    const myBeerId = req.params.myBeerId;

    try {
        const mybeer = await MyBeer.findOne({ _id: myBeerId });
        const userId = res.locals.user._id;

        if (String(mybeer.userId) != String(userId)) {
            res.json({ message: "fail", error: "not the same user" });
            return;
        }

        await MyBeer.deleteOne({ _id: myBeerId });

        // delete beer category rate
        const myPreference = res.locals.user.preference;
        const beer = await Beers.findOne({ _id: mybeer.beerId });
        const beerCategoryId = beer.categoryId;
        const rate = mybeer.rate;
        
        const beerCategory = await BeerCategory.findOne({ _id: beerCategoryId });
        const avg = beerCategory.avgRate[myPreference][0];
        const count = beerCategory.avgRate[myPreference][1];

        let avgRate: avgRate = {
            "American Lager": [0, 0],
            "Pilsner": [0, 0],
            "Pale Ale": [0, 0],
            "IPA": [0, 0],
            "Weizen": [0, 0],
            "Dunkel": [0, 0],
            "Stout": [0, 0],
            "Bock": [0, 0],
            "Unknown": [0, 0]
        }

        if (Number(count) > 1) {
            const new_avgRate = (( avg * count ) - rate) / (count - 1);

            avgRate[myPreference][0] = new_avgRate;
            avgRate[myPreference][1] = count - 1;
        }

        await BeerCategory.findOneAndUpdate({ _id: beerCategoryId }, {$set: { avgRate }});

        // delete beer rate
        const beerCount = beer.count;
        const beerAvgRate = beer.avgRate;

        let newBeerAvgRate = 0

        if (beerCount > 1) {
            newBeerAvgRate = (( beerCount * beerAvgRate) - rate) / (beerCount - 1);
        }

        await Beers.findOneAndUpdate({ name_korean: beer.name_korean }, { $set: { avgRate: newBeerAvgRate, count: beerCount - 1 } });

        res.json({ message: "success" });
    } catch (error) {
        res.json({ message: "fail", error });
    }
});

export { myBeerRouter };