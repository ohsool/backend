import express, {Request, Response, NextFunction} from "express";

import BeerCategories from "../schemas/beerCategory";
import Beers from "../schemas/beer";
import Users from "../schemas/user";

import { IBeerCategory } from "../interfaces/beerCategory";
import { IBeer } from "../interfaces/beer";
import { IAvgRate } from "../interfaces/beerCategory";

const getBeerCategories = async(req: Request, res: Response) => {
    try {
        const beerCategories: Array<IBeerCategory> = await BeerCategories.find().lean();

        res.json({ message:"success", beerCategories });
    } catch (error) {
        res.status(400).send({ message: "fail", error });
    }
}

const postBeerCategory = async(req: Request, res: Response) => {
    try {
        const { name, image, features } = req.body;
        const isExist: IBeerCategory | null = await BeerCategories.findOne({ name, image, features }).lean();

        if (res.locals.user != "ohsool") {
            res.status(401).send({ message: "fail", error: "user not authenticated" });

            return;
        }

        if(isExist) {
            res.json({ message: "fail", error: "category already exists" });

            return;
        }
        const beerCategory: IBeerCategory = await BeerCategories.create({ name, image, features })

        res.json({ message: "success", beerCategory });
    } catch (error) {
        res.status(400).send({ message: "fail" , error });
    }
}

const getBeerCategory = async(req: Request, res: Response) => {
    try {
        const { beerCategoryId } = req.params;
        const beerCategory: IBeerCategory | null = await BeerCategories.findById(beerCategoryId).lean();

        if(beerCategory) {
            res.json({ message:"success", beerCategory });
        } else {
            res.json({ message: "fail", error: "category does not exist in the database" });
        }
    } catch (error) {
        res.status(400).send({ message: "fail", error });
    }
}

const getTestResult = async(req: Request, res:Response) => {
    const result = req.body.result;

    try {
        if (!result) {
            res.json({ message: "fail", error: "test result doesn't exist" });
    
            return;
        }
    
        /* 1. 카테고리에 대한 정보 추출*/ 
        const category: IBeerCategory | null = await BeerCategories.findOne({ name: result }).lean();

        // category 에 대한 정보가 없다면 함수 종료
        if (!category) {
            res.json({ message: "fail", error: "Beer Category doesn't exist" });

            return;
        }
        
        /* 2. 추천 맥주 추출 (08/05 기준 동일한 카테고리 상위 2개만 추천) */
        const beers: Array<IBeer> | null = await Beers.find({ categoryId: category._id }).lean();

        // 관련맥주에 대한 정보가 없다면 함수 종료
        if (!beers) {
            res.json({ message: "fail", error: "Beer doesn't exist" });

            return;
        }

        const recommendations = beers.slice(0,2);
    
        res.status(200).json({ message: "success", category, recommendations });

    } catch (error) {
        res.json({ message: "fail", error });
    }
}

interface IPreferenceCounts {
    [index: string]: number,
    Lager: number,
    Pilsner: number,
    Ale: number,
    IPA: number,
    Weizen: number,
    Dunkel: number,
    Stout: number,
    Bock: number
}

const getPreferenceCount = async (req: Request, res: Response) => {
    try {
        const preferences = await Users.find({}).select("preference -_id");
        const preferenceCounts: IPreferenceCounts = {
            Lager: 0,
            Pilsner: 0,
            Ale: 0,
            IPA: 0,
            Weizen: 0,
            Dunkel: 0,
            Stout: 0,
            Bock: 0
        }

        for (let i = 0; i < preferences.length; i ++) {
            const preference = preferences[i].preference;

            if (preference != "Unknown" ) {
                preferenceCounts[preference] += 1;
            }
        }

        await BeerCategories.updateOne({ name: "Lager" }, { $set: { preferenceCount: preferenceCounts.Lager } });
        await BeerCategories.updateOne({ name: "Pilsner" }, { $set: { preferenceCount: preferenceCounts.Pilsner } });
        await BeerCategories.updateOne({ name: "Ale" }, { $set: { preferenceCount: preferenceCounts.Ale } });
        await BeerCategories.updateOne({ name: "IPA" }, { $set: { preferenceCount: preferenceCounts.IPA } });
        await BeerCategories.updateOne({ name: "Weizen" }, { $set: { preferenceCount: preferenceCounts.Weizen } });
        await BeerCategories.updateOne({ name: "Dunkel" }, { $set: { preferenceCount: preferenceCounts.Dunkel } });
        await BeerCategories.updateOne({ name: "Stout" }, { $set: { preferenceCount: preferenceCounts.Stout } });
        await BeerCategories.updateOne({ name: "Bock" }, { $set: { preferenceCount: preferenceCounts.Bock } });

        res.json({ message: "success" });
    } catch (error) {
        res.json({ message: "fail" });
    }
}

export default {
    getBeerCategories,
    postBeerCategory,
    getBeerCategory,
    getTestResult,
    getPreferenceCount
}