import express, {Request, Response, NextFunction} from "express";

import BeerCategories from "../schemas/beerCategory";
import Beers from "../schemas/beer";

import { IBeerCategory } from "../interfaces/beerCategory";
import { IBeer } from "../interfaces/beer";

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

export default {
    getBeerCategories,
    postBeerCategory,
    getBeerCategory,
    getTestResult
}