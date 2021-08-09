import express from "express";
import { getRegExp } from "korean-regexp";

import Beers from "../schemas/beer";
import BeerCategories from "../schemas/beerCategory";

const searchRouter = express.Router();

searchRouter.get("/", async (req, res) => {
    const word = String(req.query.word).toLowerCase();
    
    const words: Array<String> = []

    if (word.length < 1) {
        return;
    }

    try {
        const beers = await Beers.find({});
        const beerCategories = await BeerCategories.find({});
    
        for (let i = 0; i < beers.length; i ++) {
            if ( getRegExp(word.replace(/\s+/g, '')).test(beers[i].name_korean.replace(/\s+/g, '')) ) { // korean beer name
                words.push(beers[i].name_korean);
            } else if (beers[i].name_english.replace(/\s+/g, '').toLowerCase().includes(word)) {  // english beer name
                words.push(beers[i].name_english);
            }

        } for (let i = 0; i < beerCategories.length; i ++) {  // category names only have english name
            if ( beerCategories[i].name.replace(/\s+/g, '').toLowerCase().includes(word) ) {
                words.push(beerCategories[i].name);
            }
        } 
    
        res.json({ message: "success", words })
    } catch (error) {
        res.json({ message: "fail", error });
    }
});

export { searchRouter };