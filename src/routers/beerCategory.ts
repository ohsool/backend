import express, { Request, Response, NextFunction, Router, response } from "express";
import BeerCategories from "../schemas/beerCategory";

const beerCategoryRouter = express.Router();


beerCategoryRouter.get("/", async(req, res) => {
    try {
        const beerCategories = await BeerCategories.find();
        res.json({ beerCategories });
    } catch (error) {
        res.status(400).send({ message: "failed", error });
    }
});

beerCategoryRouter.post("/", async(req, res) => {
    try {
        const { name, image, features, avgRate } = req.body;
        const isExist = await BeerCategories.findOne({ name, image, features, avgRate });

        if(isExist) {
            res.json({ message: "category already exists" });    
            return;
        }
        await BeerCategories.create({ name, image, features, avgRate });
        res.json({ message: "success" });
    } catch (error) {
        res.status(400).send({ message: "failed" , error });
    }
});

// get one category specified by parameter
beerCategoryRouter.get("/:beerCategoryId", async(req, res) => {
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
});


export { beerCategoryRouter };