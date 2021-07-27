// crawling beer categories

import express, { Request, Response, NextFunction, Router, response } from "express";
import BeerCategories from "../schemas/beerCategory";

const beerCategoryCrawlingRouter = express.Router();

beerCategoryCrawlingRouter.post("/", async(req, res) => {
    const beerCategory = [
        {
            name: "American Lager",
            image: "",
            features: {
                "bitter": 3,
                "crispy": 5,
                "flavor": 2,
                "sweet": 1,
                "nutty": 3
            }
        },
        {
            name: "Pilsner",
            image: "",
            features: {
                "bitter": 2,
                "crispy": 4,
                "flavor": 3,
                "sweet": 2,
                "nutty": 2
            }
        },
        {
            name: "Pale Ale",
            image: "",
            features: {
                "bitter": 4,
                "crispy": 1,
                "flavor": 2,
                "sweet": 2,
                "nutty": 1
            }
        },
        {
            name: "IPA",
            image: "",
            features: {
                "bitter": 4,
                "crispy": 3,
                "flavor": 5,
                "sweet": 4,
                "nutty": 2
            }
        },
        {
            name: "Weizen",
            image: "",
            features: {
                "bitter": 1,
                "crispy": 2,
                "flavor": 4,
                "sweet": 2,
                "nutty": 1
            }
        },
        {
            name: "Dunkel",
            image: "",
            features: {
                "bitter": 3,
                "crispy": 3,
                "flavor": 3,
                "sweet": 2,
                "nutty": 5
            }
        },
        {
            name: "Stout",
            image: "",
            features: {
                "bitter": 5,
                "crispy": 2,
                "flavor": 3,
                "sweet": 2,
                "nutty": 3
            }
        },
        {
            name: "Bock",
            image: "",
            features: {
                "bitter": 2,
                "crispy": 3,
                "flavor": 3,
                "sweet": 5,
                "nutty": 2
            }
        },
    ]

    try {
        BeerCategories.collection.drop();

        for (let i = 0; i < beerCategory.length; i ++) {
            await BeerCategories.create(beerCategory[i]);
        }
    } catch (err) {
        res.json({ message: "fail", err });

        return;
    }

    res.json({ message: "success" });
});

export { beerCategoryCrawlingRouter };