// crawling beer categories

import express, { Request, Response, NextFunction, Router, response } from "express";
import BeerCategories from "../schemas/beerCategory";

const beerCategoryCrawlingRouter = express.Router();

beerCategoryCrawlingRouter.post("/", async(req, res) => {
    const beerCategory = [
        {
            name: "American Lager",
            image: "https://drive.google.com/uc?export=view&id=1rGWJaU06CmWlyi7ZKHmk7ZwhLYlf6blX ",
            title: "",
            description: "",
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
            image: "https://drive.google.com/uc?export=view&id=1j39Se8Ke79HgFHbu21Lz3gTXIm5QwKxB ",
            title: "",
            description: "",
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
            image: "https://drive.google.com/uc?export=view&id=1SsjQnOOz1LSGILxFV4cXkDJ7W5Gao4Fg ",
            title: "",
            description: "",
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
            image: "https://drive.google.com/uc?export=view&id=167ljYZXZliJWjjEXjh826ZB99EfbVYKq ",
            title: "",
            description: "",
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
            image: "https://drive.google.com/uc?export=view&id=1DTgOTUUnPwn6Q1HTcbzF3FW4UG37OnUF ",
            title: "",
            description: "",
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
            image: "https://drive.google.com/uc?export=view&id=1e8mL4UmSu5cTg7As7k_rBn50okTLv7bB ",
            title: "",
            description: "",
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
            image: "https://drive.google.com/uc?export=view&id=113ZPI5FgB7_NPD_3nQpfymHmFJsvKGk5 ",
            title: "",
            description: "",
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
            image: "https://drive.google.com/uc?export=view&id=1eOBGsAmXTuTxnuVfJoupKrB-Q-K9vv6o ",
            title: "",
            description: "",
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