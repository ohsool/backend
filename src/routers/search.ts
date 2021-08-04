import express from "express";
import Beers from "../schemas/beer";
import BeerCategories from "../schemas/beerCategory";

const searchRouter = express.Router();

searchRouter.get("/", async (req, res) => {
    const word = String(req.query.word).toLowerCase();
    
    const words: Array<String> = []

    if (word.length < 1) {
        res.json({ message: "fail", error: "no input" });
    }

    const beers = await Beers.find({});
    const beerCategories = await BeerCategories.find({});

    for (let i = 0; i < beers.length; i ++) {
        if ( beers[i].name_korean.replace(/\s+/g, '').toLowerCase().includes(word) ) {
            words.push(beers[i].name_korean);
        } else if (beers[i].name_english.replace(/\s+/g, '').toLowerCase().includes(word)) {
            words.push(beers[i].name_english);
        }
    } for (let i = 0; i < beerCategories.length; i ++) {
        if ( beerCategories[i].name.replace(/\s+/g, '').toLowerCase().includes(word) ) {
            words.push(beerCategories[i].name);
        }
    } 

    res.json({ message: "success", words })
});

export { searchRouter };