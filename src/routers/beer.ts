import express from "express";
import Beers from "../schemas/beer";

const beerRouter = express.Router();

beerRouter.get("/", async(req, res) => {
    try {
        const beers = await Beers.find();
        res.json({ beers });
    } catch (error) {
        res.status(400).send({ message: "failed", error });
    }
});

beerRouter.post("/", async(req, res) => {
    try {
        const { name_korean, name_english, image, degree, categoryId, hashtag, features } = req.body;
        const isExist = await Beers.findOne({ name_korean });

        if(isExist) {
            res.json({ message: "beer already exists" });
            return;
        }

        await Beers.create({ name_korean, name_english, image, degree, categoryId, hashtag, features });
        res.json({ message: "success" });

    } catch (error) {
        res.status(400).send({ message: "failed", error });        
    }
});

beerRouter.get("/:beerId", async(req, res) => {
    const { beerId } = req.params;
    const beer = Beers.findById({ beerId });

    if(beer) {
        res.json({ beer });
    } else {
        res.send(400).send({ message: "beer does not exist in the database" });
        return;
    }
});

beerRouter.delete("/:beerId", async(req, res) => {
    const { beerId } = req.params;

    try {
        await Beers.findOneAndDelete({ _id: beerId });
        res.json({ message: "success"})
    } catch(error) {
        res.status(400).send({ message: "failed deleting beer from the database" });
    }
});

export { beerRouter };