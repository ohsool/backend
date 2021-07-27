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
        let name = beerCategory[i]

        let beerObject = { name: [beerCategory._id, beerCategory.features ] }

        beerCategoryArray.push([ beerCategory._id, beerCategory.features ]);
    }

    // American Lager Id : beerCategoryArray[0][0]
    // American Lager features: beerCategoryArray[0][1]

    // Pilsner Lager Id : beerCategoryArray[1][0]
    // Pilsner Lager features: beerCategoryArray[1][1]

    const beers = [
        {
            name_korean: "버드와이저",
            name_english: "Budweiser",
            image: "",
            degree: 5.0,
            categoryId: beerCategoryArray[0][0],
            hashtag: [
                "엷은 황금색",
                "안호이저-부시(인베브)",
                "라이트 바디"
            ],
            features: beerCategoryArray[0][1]
        },
        {
            name_korean: "밀러 라이트",
            name_english: "Miller Li",
            image: "",
            degree: 4.2,
            categoryId: beerCategoryArray[0][0],
            hashtag: [
                "라이트 비어",
                "밀러쿠어스(MillerCoors)",
                "미국 위스콘신주 밀워키"
            ],
            features: beerCategoryArray[0][1]
        },
    ]

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