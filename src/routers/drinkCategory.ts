import express, { Request, Response, NextFunction, Router, response } from "express";
import { title } from "process";
import DrinkCategories from "../schemas/drinkCategory";

const drinkCategoryRouter = express.Router();

drinkCategoryRouter.get("/", async(req, res) => {
    try {
        const drinkCategories = await DrinkCategories.find();
        res.json({ drinkCategories });
    } catch (error) {
        res.status(400).send({ message: "failed", error });
    }
});

drinkCategoryRouter.post("/", async(req, res) => {
    try {
        const { title, image } = req.body;
        const isExist = await DrinkCategories.findOne({ title, image });

        if(isExist) {
            res.json({ message: "category already exists" });    
        }
        await DrinkCategories.create({ title, image });
        res.json({ message: "success" });
    } catch (error) {
        res.status(400).send({ message: "failed" , error });
    }
});

// get one category specified by parameter
drinkCategoryRouter.get("/:drinkCategoryId", async(req, res) => {
    try {
        const { drinkCategoryId } = req.params;
       
        const drink = DrinkCategories.findById(drinkCategoryId);
        if(drink) {
            res.json({ drink });
        } else {
            res.json({ message: "category does not exist in the database" });
        }

    } catch (error) {
       res.status(400).send({ message: "failed", error });
   } 
});

export { drinkCategoryRouter };