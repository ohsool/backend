import express, {Request, Response, NextFunction} from "express";
import BeerCategories from "../schemas/beerCategory";

const getBeerCategories = async(req: Request, res: Response) => {
    try {
        const beerCategories = await BeerCategories.find();
        res.json({ beerCategories });
    } catch (error) {
        res.status(400).send({ message: "failed", error });
    }
}

const postBeerCategory = async(req: Request, res: Response) => {
    try {
        const { name, image, features } = req.body;
        const isExist = await BeerCategories.findOne({ name, image, features });

        if(isExist) {
        res.json({ message: "category already exists" });
        return;
    }
        await BeerCategories.create({ name, image, features });
        res.json({ message: "success" });
    } catch (error) {
        res.status(400).send({ message: "failed" , error });
    }
}

const getBeerCategory = async(req: Request, res: Response) => {
    try {
        const { beerCategoryId } = req.params;

        const beerCategory = BeerCategories.findById(beerCategoryId);
        if(beerCategory) {
            res.json({ beerCategory });
        } else {
            res.json({ message: "category does not exist in the database" });
            return;
        }
    } catch (error) {
        res.status(400).send({ message: "failed", error });
    }
}

export default {
    getBeerCategories,
    postBeerCategory,
    getBeerCategory
}