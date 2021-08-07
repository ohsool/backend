import request from "supertest";
import { app } from "../app";

import Beers from "../schemas/beer";
import Users from "../schemas/user";
import MyBeers from "../schemas/mybeer";
import BeerCategories from "../schemas/beerCategory";

let token = "";
let mybeerId = "";
let beerId = "";
let beerCategoryId = "";

it ("register success, get beer id, get beercategory id", async () => {
    const response = await request(app).post("/api/user").send({
        email: "mybeertest@test.com",
        nickname: "mybeertest",
        password: "mybeertest1234",
        confirmPassword: "mybeertest1234"
    });

    const beer = await Beers.findOne({ name_korean: "버드와이저" });
    beerId = beer._id;
    beerCategoryId = beer.categoryId;

    expect(response.body.message).toBe("success");
    expect(response.statusCode).toBe(201); 
});

it ("login success", async () => {
    const response = await request(app).post("/api/user/auth").send({
        email: "mybeertest@test.com",
        password: "mybeertest1234"
    });

    token = response.body.token;

    expect(response.body.message).toBe("success");
    expect(response.body.token).toBeTruthy();
});

it ("post mybeer - success", async () => {
    let beer = await Beers.findOne({ _id: beerId });
    const countBefore = beer.count;
    const avgRateBefore = beer.avgRate;

    let beerCategory = await BeerCategories.findOne({ _id: beer.categoryId });
    // const countCategoryBefore = beerCategory.avgRate.

    const response = await request(app).post(`/api/mybeer/${beerId}`)
    .auth(token, { type: 'bearer' })
    .send({
        myFeatures: {
            "bitter": 2, 
            "crispy": 4, 
            "flavor": 5, 
            "sweet": 3, 
            "nutty": 5
        },
        location: "test location",
        rate: 5,
        review: "test mybeer"
    });

    mybeerId = response.body.myBeerId;

    beer = await Beers.findOne({ _id: beerId });
    const countAfter = beer.count;
    const avgRateAfter = beer.avgRate;

    const avgRate = (( countBefore * avgRateBefore ) + 5) / (countBefore + 1);

    expect(response.body.message).toBe("success");
    expect(countAfter - countBefore).toBe(1);
    expect(avgRate).toBe(avgRateAfter);
    expect(response.body.myBeerId).toBeTruthy();
});

it ("post mybeer - fail (beer doesn't exist)", async () => {
    const response = await request(app).post(`/api/mybeer/60fff3d78bee04273caf27a5`)
    .auth(token, { type: 'bearer' })
    .send({
        myFeatures: {
            "bitter": 2, 
            "crispy": 4, 
            "flavor": 5, 
            "sweet": 3, 
            "nutty": 5
        },
        location: "test location",
        rate: 5,
        review: "test mybeer"
    });

    expect(response.body.message).toBe("fail");
    expect(response.body.error).toBe("beer doesn't exist");
});

it ("post mybeer - fail (no rate)", async () => {
    const response = await request(app).post(`/api/mybeer/${beerId}`)
    .auth(token, { type: 'bearer' })
    .send({
        myFeatures: {
            "bitter": 2, 
            "crispy": 4, 
            "flavor": 5, 
            "sweet": 3, 
            "nutty": 5
        },
        location: "test location",
        review: "test mybeer"
    });

    expect(response.body.message).toBe("fail");
    expect(response.body.error).toBe("Either beer or myFeatures or rate doesn't exist.");
});

it ("post mybeer - fail (review too long)", async () => {
    const response = await request(app).post(`/api/mybeer/${beerId}`)
    .auth(token, { type: 'bearer' })
    .send({
        myFeatures: {
            "bitter": 2, 
            "crispy": 4, 
            "flavor": 5, 
            "sweet": 3, 
            "nutty": 5
        },
        location: "test location",
        rate: 5,
        review: "test mybeer review too long test mybeer review too long test mybeer review too long test mybeer review too long test mybeer review too long test mybeer review too long test mybeer review too long"
    });

    expect(response.body.message).toBe("fail");
    expect(response.body.error).toBe("the length of the review must be under 48");
});