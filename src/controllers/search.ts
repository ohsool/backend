import express, { Request, Response, NextFunction, Router } from "express";
import mongoose, { Schema, model, mongo } from "mongoose";
import { getRegExp } from "korean-regexp";

import Beers from "../schemas/beer";
import BeerCategories from "../schemas/beerCategory";

import { IBeer } from "../interfaces/beer";
import { IBeerCategory } from "../interfaces/beerCategory";
import { env } from "../env";

let hashtags:Array<string> = [""];
let beers:Array<IBeer> = [];
let beerCategories:Array<IBeerCategory> = [];

async function get_beers(): Promise<Array<IBeer>> {
    beers = await Beers.find({}).lean();
    beerCategories = await BeerCategories.find({}).lean();

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
}).catch((error) => {
    console.log("error during getting hashtags");
})

const search = async (req: Request, res: Response) => {
    const word = String(req.query.word).toLowerCase();
    const searched_beers: Array<IBeer> = [];
    const searched_categories: Array<IBeerCategory> = [];

    const hashtag = String(req.query.hashtag);
    const send_hashtags: Array<string> = [];

    if (word.length < 1 || hashtag.length < 1) {
        return;
    }

    try {
        if (word) {
            if (env.modeNow == "test") {
                beers = await Beers.find({});
                beerCategories = await BeerCategories.find({});
            }

            for (let i = 0; i < beers.length; i ++) {
                if ( getRegExp(word.replace(/\s+/g, '')).test(beers[i].name_korean.replace(/\s+/g, '')) ) { // korean beer name
                    searched_beers.push(beers[i]);
                } else if (beers[i].name_english.replace(/\s+/g, '').toLowerCase().includes(word)) {  // english beer name
                    searched_beers.push(beers[i]);
                }
    
            } for (let i = 0; i < beerCategories.length; i ++) {  // category names only have english name
                if ( beerCategories[i].name.replace(/\s+/g, '').toLowerCase().includes(word) ) {
                    searched_categories.push(beerCategories[i]);
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
    
        res.json({ message: "success", beers: searched_beers, beerCategories: searched_categories, hashtags: send_hashtags });
    } catch (error) {
        res.json({ message: "fail", error });
    }
}

const searchDeep = async (req: Request, res: Response) => {
    const word = String(req.query.word).toLowerCase();
    const searched_beers: Array<IBeer> = [];
    const searched_categories: Array<IBeerCategory> = [];

    const hashtag = String(req.query.hashtag);
    const send_hashtags: Array<string> = [];

    if (word.length < 1 || hashtag.length < 1) {
        return;
    }

    try {
        if (word) {
            beers = await Beers.find({});
            beerCategories = await BeerCategories.find({});

            for (let i = 0; i < beers.length; i ++) {
                if ( getRegExp(word.replace(/\s+/g, '')).test(beers[i].name_korean.replace(/\s+/g, '')) ) { // korean beer name
                    searched_beers.push(beers[i]);
                } else if (beers[i].name_english.replace(/\s+/g, '').toLowerCase().includes(word)) {  // english beer name
                    searched_beers.push(beers[i]);
                }
    
            } for (let i = 0; i < beerCategories.length; i ++) {  // category names only have english name
                if ( beerCategories[i].name.replace(/\s+/g, '').toLowerCase().includes(word) ) {
                    searched_categories.push(beerCategories[i]);
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
    
        res.json({ message: "success", beers: searched_beers, beerCategories: searched_categories, hashtags: send_hashtags });
    } catch (error) {
        res.json({ message: "fail", error });
    }
}

const searchHashtag = async (req: Request, res: Response) => {
    const hash_tag: string = String(req.query.hashtag) || "";
    const hashtag: Array<string> = [hash_tag];

    try {
        const newBeers: Array<IBeer> = [];

        if (env.modeNow == "test") {
            beers = await Beers.find({ hashtag: { $in: hashtag } });
        }

        for (let i = 0; i < beers.length; i ++) {
            if ( beers[i].hashtag.includes(hash_tag) ) {
                newBeers.push(beers[i]);
            }
        }

        res.json({ message: "success", beers: newBeers });
    } catch (error) {
        res.json({ message: "fail", error });
    }
}

export default {
    search,
    searchHashtag,
    searchDeep
}