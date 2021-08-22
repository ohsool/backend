import request from "supertest";
import { app } from "./test-app";
import mongoose, { Schema, model, mongo, ObjectId } from "mongoose";
// import { app } from "../app";
import { disconnect } from "../schemas";

import Beers from "../schemas/beer";
import BeerCategories from "../schemas/beerCategory";
import { IBeer } from "../interfaces/beer";
import { IBeerCategory } from "../interfaces/beerCategory";

// import { secretAPIkey } from '../ssl/secretAPI';
// const key = secretAPIkey();

let refresh = "";
let access = "";
let anotherrefresh = "";
let anotheraccess = "";
let mybeerId = "";
let beerId: mongoose.Types.ObjectId;
let beerCategoryId: mongoose.Types.ObjectId;

const myFeatures = {
    "bitter": 5, 
    "crispy": 5, 
    "flavor": 5, 
    "sweet": 5, 
    "nutty": 5
}
const location = "test location";
const rate = 5;
const modified_rate = 4;
const review = "test mybeer";

const nickname = "mybeertest";

const wrongId = "610e5058dc866bf2e5db6334";

it ("login success", async () => {
    const response = await request(app).post(`/api/user/auth`)
        // .set('secretkey', key)
        .send({ 
            email: "mybeertest@test.com",
            password: "mybeertest1234" 
        });

    refresh = response.body.refreshToken;
    access = response.body.accessToken;

    const beer: IBeer | null = await Beers.findOne({ name_korean: "버드와이저" })!;
    beerId = beer!._id!;
    beerCategoryId = beer!.categoryId;

    expect(response.body.message).toBe("success");
    expect(response.body.refreshToken).toBeTruthy();
    expect(response.body.accessToken).toBeTruthy();
});

it ("another login success", async () => {
    const response = await request(app).post(`/api/user/auth`)
        // .set('secretkey', key)
        .send({
            email: "anothermybeertest@test.com",
            password: "mybeertest1234"
        });

    anotherrefresh = response.body.refreshToken;
    anotheraccess = response.body.accessToken;

    expect(response.body.message).toBe("success");
    expect(response.body.refreshToken).toBeTruthy();
    expect(response.body.accessToken).toBeTruthy();
});

it ("post mybeer - success", async () => {
    let beer: IBeer | null = await Beers.findOne({ _id: beerId });
    const countBefore: Number | undefined = beer!.count!;
    const avgRateBefore: Number | undefined = beer!.avgRate!;

    let beerCategory: IBeerCategory | null = await BeerCategories.findOne({ _id: beer!.categoryId });
    const avgRateCategoryBefore = beerCategory!.avgRate["Unknown"][0];
    const countCategoryBefore = beerCategory!.avgRate["Unknown"][1];

    const response = await request(app).post(`/api/mybeer/${beerId}`)
        // .set('secretkey', key)
        .set('refresh', `Bearer ${refresh}`)
        .set('access', `Bearer ${access}`)
        .send({ myFeatures, location, rate, review });

    mybeerId = response.body.mybeer._id;

    beer = await Beers.findOne({ _id: beerId });
    const countAfter: Number = beer!.count!;
    const avgRateAfter: Number = beer!.avgRate!;

    beerCategory = await BeerCategories.findOne({ _id: beer!.categoryId });
    const avgRateCategoryAfter = beerCategory!.avgRate["Unknown"][0];
    const countCategoryAfter = beerCategory!.avgRate["Unknown"][1];

    const avgRate = (( +countBefore * +avgRateBefore ) + rate) / (+countBefore + 1);
    const avgRateCategory = (( countCategoryBefore * avgRateCategoryBefore ) + rate) / (countCategoryBefore + 1);

    expect(response.body.message).toBe("success");
    expect(+countAfter - +countBefore).toBe(1);
    expect(avgRate).toBe(avgRateAfter);
    expect(countCategoryAfter - countCategoryBefore).toBe(1);
    expect(avgRateCategory).toBe(avgRateCategoryAfter);
    expect(response.body.mybeer).toBeTruthy();
});

it ("post mybeer - fail (beer doesn't exist)", async () => {
    const response = await request(app).post(`/api/mybeer/${wrongId}`)
        // .set('secretkey', key)
        .set('refresh', `Bearer ${refresh}`)
        .set('access', `Bearer ${access}`)
        .send({ myFeatures, location, rate, review });

    expect(response.body.message).toBe("fail");
    expect(response.body.error).toBe("beer doesn't exist");
});

it ("post mybeer - fail (no rate)", async () => {
    const response = await request(app).post(`/api/mybeer/${beerId}`)
        // .set('secretkey', key)
        .set('refresh', `Bearer ${refresh}`)
        .set('access', `Bearer ${access}`)
        .send({ myFeatures, location, review });

    expect(response.body.message).toBe("fail");
    expect(response.body.error).toBe("Either beer or myFeatures or rate doesn't exist.");
});

it ("post mybeer - fail (review too long)", async () => {
    const response = await request(app).post(`/api/mybeer/${beerId}`)
        // .set('secretkey', key)
        .set('refresh', `Bearer ${refresh}`)
        .set('access', `Bearer ${access}`)
        .send({
            myFeatures, location, rate, review: "test mybeer review too long test mybeer review too long test mybeer review too long test mybeer review too long test mybeer review too long test mybeer review too long test mybeer review too long"
        });

    expect(response.body.message).toBe("fail");
    expect(response.body.error).toBe("the length of the review must be under 48");
});

it ("get all mybeers - success", async () => {
    const response = await request(app).get(`/api/mybeer/all`)
        // .set('secretkey', key)
        .set('refresh', `Bearer ${refresh}`)
        .set('access', `Bearer ${access}`)
        .send();

    expect(response.body.message).toBe("success");
    expect(response.body.mybeers).toBeTruthy();
    expect(Array.isArray(response.body.mybeers)).toBe(true);
});

it ("get my mybeers - success", async () => {
    const response = await request(app).get(`/api/mybeer/my`)
        // .set('secretkey', key)
        .set('refresh', `Bearer ${refresh}`)
        .set('access', `Bearer ${access}`)
        .send();

    expect(response.body.message).toBe("success");
    expect(response.body.mybeers).toBeTruthy();
    expect(Array.isArray(response.body.mybeers)).toBe(true);
});

it ("get specific beer's mybeers - success", async () => {
    const response = await request(app).get(`/api/mybeer/beer/${beerId}`)
        // .set('secretkey', key)
        .set('refresh', `Bearer ${refresh}`)
        .set('access', `Bearer ${access}`)
        .send();

    expect(response.body.message).toBe("success");
    expect(response.body.mybeers).toBeTruthy();
    expect(Array.isArray(response.body.mybeers)).toBe(true);
});

it ("get specific beer's mybeers - fail (wrong beerId)", async () => {
    const response = await request(app).get(`/api/mybeer/beer/${wrongId}`)
        // .set('secretkey', key)
        .set('refresh', `Bearer ${refresh}`)
        .set('access', `Bearer ${access}`)
        .send();

    expect(response.body.message).toBe("fail");
    expect(response.body.error).toBe("beer doesn't exist");
});

it ("get one specific mybeer - success", async () => {
    const response = await request(app).get(`/api/mybeer/${mybeerId}`)
        // .set('secretkey', key)
        .set('refresh', `Bearer ${refresh}`)
        .set('access', `Bearer ${access}`)
        .send();

    expect(response.body.message).toBe("success");
    expect(response.body.mybeer).toBeTruthy();
    expect(response.body.mybeer._id).toBe(mybeerId);
    expect(response.body.mybeer.userId.nickname).toBe(nickname);
});

it ("get one specific mybeer - fail (wrong mybeer id)", async () => {
    const response = await request(app).get(`/api/mybeer/${wrongId}`)
        // .set('secretkey', key)
        .set('refresh', `Bearer ${refresh}`)
        .set('access', `Bearer ${access}`)
        .send();

    expect(response.body.message).toBe("fail");
    expect(response.body.error).toBe("no existed mybeer");
});

it ("modify one mybeer - success", async () => {
    let beer = await Beers.findOne({ _id: beerId });
    const countBefore: Number = beer!.count!;
    const avgRateBefore: Number = beer!.avgRate!;

    let beerCategory: IBeerCategory | null = await BeerCategories.findOne({ _id: beer!.categoryId });
    const avgRateCategoryBefore = beerCategory!.avgRate["Unknown"][0];
    const countCategoryBefore = beerCategory!.avgRate["Unknown"][1];

    const response = await request(app).put(`/api/mybeer/${mybeerId}`)
        // .set('secretkey', key)
        .set('refresh', `Bearer ${refresh}`)
        .set('access', `Bearer ${access}`)
        .send({
            myFeatures, location, rate, review: "modified review"
        });

    beer = await Beers.findOne({ _id: beerId });
    const countAfter = beer!.count;
    const avgRateAfter = beer!.avgRate;

    beerCategory = await BeerCategories.findOne({ _id: beer!.categoryId });
    const avgRateCategoryAfter = beerCategory!.avgRate["Unknown"][0];
    const countCategoryAfter = beerCategory!.avgRate["Unknown"][1];

    const avgRate = (( +countBefore * +avgRateBefore ) - rate + modified_rate) / +countBefore;
    const avgRateCategory = (( countCategoryBefore * avgRateCategoryBefore ) - rate + modified_rate) / countCategoryBefore;

    expect(response.body.message).toBe("success");
    expect(countAfter).toBe(countBefore);
    // expect(avgRate).toBe(avgRateAfter);
    expect(countCategoryAfter).toBe(countCategoryBefore);
    // expect(avgRateCategory).toBe(avgRateCategoryAfter);
    expect(response.body.myBeerId).toBe(mybeerId);
});

it ("modify one mybeer - fail (wrong id)", async () => {
    const response = await request(app).put(`/api/mybeer/${wrongId}`)
        // .set('secretkey', key)
        .set('refresh', `Bearer ${refresh}`)
        .set('access', `Bearer ${access}`)
        .send({
            myFeatures, location, rate: 4, review: "modified review"
        });

    expect(response.body.message).toBe("fail");
    expect(response.body.error).toBe("wrong mybeer id");
});

it ("modify one mybeer - fail (wrong user)", async () => {
    const response = await request(app).put(`/api/mybeer/${mybeerId}`)
        // .set('secretkey', key)
        .set('refresh', `Bearer ${anotherrefresh}`)
        .set('access', `Bearer ${anotheraccess}`)
        .send({
            myFeatures, location, rate: 4, review: "modified review"
        });

    expect(response.body.message).toBe("fail");
    expect(response.body.error).toBe("not the same user");
});

it ("delete one mybeer - fail (wrong user)", async () => {
    const response = await request(app).delete(`/api/mybeer/${mybeerId}`)
        // .set('secretkey', key)
        .set('refresh', `Bearer ${anotherrefresh}`)
        .set('access', `Bearer ${anotheraccess}`)
        .send();

    expect(response.body.message).toBe("fail");
    expect(response.body.error).toBe("not the same user");
});

it ("delete one mybeer - fail (wrong id)", async () => {
    const response = await request(app).delete(`/api/mybeer/${wrongId}`)
        // .set('secretkey', key)
        .set('refresh', `Bearer ${refresh}`)
        .set('access', `Bearer ${access}`)
        .send();

    expect(response.body.message).toBe("fail");
    expect(response.body.error).toBeTruthy();
    //expect(response.body.error).toBe("wrong mybeer id");
});

it ("delete one mybeer - success", async () => {
    let beer = await Beers.findOne({ _id: beerId });
    const countBefore: Number = beer!.count!;
    const avgRateBefore: Number = beer!.avgRate!;

    let beerCategory: IBeerCategory | null = await BeerCategories.findOne({ _id: beer!.categoryId });
    const avgRateCategoryBefore = beerCategory!.avgRate["Unknown"][0];
    const countCategoryBefore = beerCategory!.avgRate["Unknown"][1];

    const response = await request(app).delete(`/api/mybeer/${mybeerId}`)
        // .set('secretkey', key)
        .set('refresh', `Bearer ${refresh}`)
        .set('access', `Bearer ${access}`)
        .send();

    beer = await Beers.findOne({ _id: beerId });
    const countAfter = beer!.count!;
    const avgRateAfter = beer!.avgRate!;

    beerCategory = await BeerCategories.findOne({ _id: beer!.categoryId });
    const avgRateCategoryAfter = beerCategory!.avgRate["Unknown"][0];
    const countCategoryAfter = beerCategory!.avgRate["Unknown"][1];

    let avgRate = 0;
    let avgRateCategory = 0;

    if (countBefore > 1) {
        avgRate = (( +countBefore * +avgRateBefore ) - modified_rate) / ( +countBefore - 1);
        avgRateCategory = (( countCategoryBefore * avgRateCategoryBefore ) - modified_rate) / ( countCategoryBefore - 1); 
    }

    expect(response.body.message).toBe("success");
    expect(countCategoryBefore - countCategoryAfter).toBe(1);
    // expect(avgRateCategory).toBe(avgRateCategoryAfter);
    expect(+countBefore - +countAfter).toBe(1);
    // expect(avgRate).toBe(avgRateAfter);
});

 // Disconnect Mongoose
 afterAll( async () => {
    await disconnect()
})