// crawling beers

import express, { Request, Response, NextFunction, Router, response } from "express";
import Beers from "../schemas/beer";
import BeerCategories from "../schemas/beerCategory";

const beerCrawlingRouter = express.Router();

beerCrawlingRouter.get("/", async(req, res) => {
    const beerCategories = ["American Lager", "Pilsner", "Pale Ale", "IPA", "Weizen", "Dunkel", "Stout", "Bock"]
    let beerCategoryArray: Array <any> = [];

    for (let i = 0; i < beerCategories.length; i ++) {
        let beerCategory = await BeerCategories.findOne({ name: beerCategories[i] });

        beerCategoryArray.push([ beerCategory._id, beerCategory.features ]);
    }

    // American Lager Id : beerCategoryArray[0][0]
    // American Lager features: beerCategoryArray[0][1]

    // Pilsner Lager Id : beerCategoryArray[1][0]
    // Pilsner Lager features: beerCategoryArray[1][1]

   


    try {
        for (let i = 0; i < beers.length; i ++) {
            await Beers.create(beers[i]);
        }
    } catch (err) {
        res.json({ message: "fail", err });

        return;
    }

    res.json({ message: "success" });
});

export { beerCrawlingRouter };