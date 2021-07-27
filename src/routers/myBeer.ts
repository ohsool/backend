import express, {Request,Response,NextFunction,Router,response,} from "express";
import MyBeer from "../schemas/mybeer";
import Beer from "../schemas/beer";
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
        res.json({ message: "fail" });

        return;
    } else if (!location) {
        location = "";
    }

    const features = ["bitter", "crispy", "flavor", "sweet", "nutty"];

    // If there is no value in features, set to 0
    for (let i = 0; i < features.length; i ++) {
        if (!myFeatures[features[i]]) {
            myFeatures[features[i]] = 1;
        }
    }

    const beer_ = await Beer.findOne({ name_korean: beer });
    const beerId = beer_._id;

    const userId = res.locals.user._id;

    const date = new Date();

    try {
        const myBeer = await MyBeer.create({ beerId, userId, myFeatures, date, location, rate, review});
        const myBeerId = myBeer._id;

        const myPreference = res.locals.user.preference;
        const beer_ = await Beer.findOne({ name_korean: beer });
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

        res.send({ message: "success", myBeerId });
    } catch (err) {
        res.json({ message: "fail", err });

        return;
    }
});

// get all mybeers
myBeerRouter.get("/all", authMiddleware, async (req, res) => {
    try {
        const mybeers = await MyBeer.find({});

        res.json({ message: "success", mybeers });
    } catch (err) {

        res.json({ message: "fail", err });
    }
    
});

// get my mybeers
myBeerRouter.get("/all", authMiddleware, async (req, res) => {
    const userId = res.locals.user._id;

    try {
        const mybeers = await MyBeer.find({ userId });

        res.json({ message: "success", mybeers });
    } catch (err) {
        res.json({ message: "fail", err });
    }
    
});

// get one mybeer
myBeerRouter.get("/:myBeerId", authMiddleware, async (req, res) => {
    const myBeerId = req.params.myBeerId;

    try {
        const mybeer = await MyBeer.findOne({ _id: myBeerId });

        res.json({ message: "success", mybeer });
    } catch (err) {
        res.json({ message: "fail", err });
    }
});

// delete one mybeer
myBeerRouter.delete("/:myBeerId", authMiddleware, async (req, res) => {
    const myBeerId = req.params.myBeerId;

    try {
        const mybeer = await MyBeer.findOneAndDelete({ _id: myBeerId });

        // delete할 때 beerCategory/avgRate에서도 그 rate 뺄까?
        const myPreference = res.locals.user.preference;
        const beer_ = await Beer.findOne({ name: mybeer.name });
        const beerCategoryId = beer_.categoryId;
        const rate = mybeer.rate
        
        const beerCategory = await BeerCategory.findOne({ _id: beerCategoryId });
        const avg = beerCategory.avgRate[myPreference][0];
        const count = beerCategory.avgRate[myPreference][1];

        const new_avgRate = (( avg * count ) - rate) / (count - 1);

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
        avgRate[myPreference][1] = count - 1;

        await BeerCategory.findOneAndUpdate({ _id: beerCategoryId }, {$set: { avgRate }});

        res.json({ message: "success" });
    } catch (err) {
        res.json({ message: "fail", err });
    }
});

export { myBeerRouter };