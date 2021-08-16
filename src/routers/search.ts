import express from "express";
import { getRegExp } from "korean-regexp";

import Beers from "../schemas/beer";
import BeerCategories from "../schemas/beerCategory";

const searchRouter = express.Router();

interface Beer {
    hashtag: Array<String>
}

let hashtags:Array<String> = [""];

async function get_beers(): Promise<Array<Beer>> {
    const beers = await Beers.find({});

    return beers;
}

// get hashtags at the first time
// this should be start again when added beer
get_beers().then((beers) => {
    for (let i = 0; i < beers.length; i ++) {
        const hashtag = beers[i].hashtag;
    
        for (let j = 0; j < hashtags.length; j ++) {
            if (!hashtags.includes(hashtag[j]) && hashtag[j]) {
                hashtags.push(hashtag[j]);
            }
        }
    }

    hashtags.shift();
});

searchRouter.get("/", async (req, res) => {
    const word = String(req.query.word).toLowerCase();
    const words: Array<String> = [];

    const hashtag = String(req.query.hashtag);
    const send_hashtags: Array<String> = [];

    if (word.length < 1 || hashtag.length < 1) {
        return;
    }

    try {
        if (word) {
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
        }

        if (hashtag) {
            for (let i = 0; i < hashtags.length; i ++) {
                if ( getRegExp(hashtag).test(String(hashtags[i])) ) {
                    send_hashtags.push(hashtags[i]);
                }
            }
        }
        
    
        res.json({ message: "success", words, hashtags: send_hashtags });
    } catch (error) {
        res.json({ message: "fail", error });
    }
});

export { searchRouter };