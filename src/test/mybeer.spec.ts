import request from "supertest";
import { app } from "../app";

import Beers from "../schemas/beer";
import Users from "../schemas/user";
import MyBeers from "../schemas/mybeer";
import BeerCategories from "../schemas/beerCategory";

import { secretAPIkey } from '../ssl/secretAPI';
const key = secretAPIkey();

let token = "";
let anothertoken = "";
let mybeerId = "";
let beerId = "";
let beerCategoryId = "";

const myFeatures = {
    "bitter": 5, 
    "crispy": 5, 
    "flavor": 5, 
    "sweet": 5, 
    "nutty": 5
}
const location = "test location";
const rate = 5;
const review = "test mybeer";

const email = "mybeertest@test.com"
const nickname = "mybeertest";
const password = "mybeertest1234";
const confirmPassword = "mybeertest1234";

const wrongId = "610e5058dc866bf2e5db6334";

it ("register success, get beer id, get beercategory id", async () => {
    const response = await request(app).post(`/${key}/api/user`)
        .send({ email, nickname, password, confirmPassword });

    const beer = await Beers.findOne({ name_korean: "버드와이저" });
    beerId = beer._id;
    beerCategoryId = beer.categoryId;

    expect(response.body.message).toBe("success");
    expect(response.statusCode).toBe(201); 
});

it ("login success", async () => {
    const response = await request(app).post(`/${key}/api/user/auth`)
    .send({ email, password });

    token = response.body.token;

    expect(response.body.message).toBe("success");
    expect(response.body.token).toBeTruthy();
});

it ("another register success, get beer id, get beercategory id", async () => {
    const response = await request(app).post(`/${key}/api/user`)
        .send({ 
            email: "anothermybeertest@test.com",
            nickname: "anothermybeertest22",
            password: "mybeertest1234", 
            confirmPassword: "mybeertest1234"
        });

    const beer = await Beers.findOne({ name_korean: "버드와이저" });
    beerId = beer._id;
    beerCategoryId = beer.categoryId;

    console.log("res:", response.body);

    expect(response.body.message).toBe("success");
    expect(response.statusCode).toBe(201); 
});

it ("another login success", async () => {
    const response = await request(app).post(`/${key}/api/user/auth`).send({
        email: "anothermybeertest@test.com",
        password: "mybeertest1234"
    });

    anothertoken = response.body.token;

    expect(response.body.message).toBe("success");
    expect(response.body.token).toBeTruthy();
});

it ("post mybeer - success", async () => {
    let beer = await Beers.findOne({ _id: beerId });
    const countBefore = beer.count;
    const avgRateBefore = beer.avgRate;

    let beerCategory = await BeerCategories.findOne({ _id: beer.categoryId });
    const avgRateCategoryBefore = beerCategory.avgRate["Unknown"][0];
    const countCategoryBefore = beerCategory.avgRate["Unknown"][1];

    const response = await request(app).post(`/${key}/api/mybeer/${beerId}`)
    .auth(token, { type: 'bearer' })
    .send({ myFeatures, location, rate, review });

    mybeerId = response.body.myBeer._id;

    beer = await Beers.findOne({ _id: beerId });
    const countAfter = beer.count;
    const avgRateAfter = beer.avgRate;

    beerCategory = await BeerCategories.findOne({ _id: beer.categoryId });
    const avgRateCategoryAfter = beerCategory.avgRate["Unknown"][0];
    const countCategoryAfter = beerCategory.avgRate["Unknown"][1];

    const avgRate = (( countBefore * avgRateBefore ) + rate) / (countBefore + 1);
    const avgRateCategory = (( countCategoryBefore * avgRateCategoryBefore ) + rate) / (countCategoryBefore + 1);

    expect(response.body.message).toBe("success");
    expect(countAfter - countBefore).toBe(1);
    expect(avgRate).toBe(avgRateAfter);
    expect(countCategoryAfter - countCategoryBefore).toBe(1);
    expect(avgRateCategory).toBe(avgRateCategoryAfter);
    expect(response.body.myBeer).toBeTruthy();
});

it ("post mybeer - fail (beer doesn't exist)", async () => {
    const response = await request(app).post(`/${key}/api/mybeer/${wrongId}`)
    .auth(token, { type: 'bearer' })
    .send({ myFeatures, location, rate, review });

    expect(response.body.message).toBe("fail");
    expect(response.body.error).toBe("beer doesn't exist");
});

it ("post mybeer - fail (no rate)", async () => {
    const response = await request(app).post(`/${key}/api/mybeer/${beerId}`)
    .auth(token, { type: 'bearer' })
    .send({ myFeatures, location, review });

    expect(response.body.message).toBe("fail");
    expect(response.body.error).toBe("Either beer or myFeatures or rate doesn't exist.");
});

it ("post mybeer - fail (review too long)", async () => {
    const response = await request(app).post(`/${key}/api/mybeer/${beerId}`)
    .auth(token, { type: 'bearer' })
    .send({
        myFeatures, location, rate, review: "test mybeer review too long test mybeer review too long test mybeer review too long test mybeer review too long test mybeer review too long test mybeer review too long test mybeer review too long"
    });

    expect(response.body.message).toBe("fail");
    expect(response.body.error).toBe("the length of the review must be under 48");
});

it ("get all mybeers - success", async () => {
    const response = await request(app).get(`/${key}/api/mybeer/all`)
    .auth(token, { type: 'bearer' })
    .send();

    expect(response.body.message).toBe("success");
    expect(response.body.mybeers).toBeTruthy();
    expect(Array.isArray(response.body.mybeers)).toBe(true);
});

it ("get my mybeers - success", async () => {
    const response = await request(app).get(`/${key}/api/mybeer/my`)
    .auth(token, { type: 'bearer' })
    .send();

    expect(response.body.message).toBe("success");
    expect(response.body.mybeers).toBeTruthy();
    expect(Array.isArray(response.body.mybeers)).toBe(true);
});

it ("get specific beer's mybeers - success", async () => {
    const response = await request(app).get(`/${key}/api/mybeer/beer/${beerId}`)
    .auth(token, { type: 'bearer' })
    .send();

    expect(response.body.message).toBe("success");
    expect(response.body.mybeers).toBeTruthy();
    expect(Array.isArray(response.body.mybeers)).toBe(true);
});

it ("get specific beer's mybeers - fail (wrong beerId)", async () => {
    const response = await request(app).get(`/${key}/api/mybeer/beer/${wrongId}`)
    .auth(token, { type: 'bearer' })
    .send();

    expect(response.body.message).toBe("fail");
    expect(response.body.error).toBe("beer doesn't exist");
});

it ("get one specific mybeer - success", async () => {
    const response = await request(app).get(`/${key}/api/mybeer/${beerId}`)
    .auth(token, { type: 'bearer' })
    .send();

    expect(response.body.message).toBe("success");
    expect(response.body.mybeer).toBeTruthy();
    expect(response.body.mybeer._id).toBe(mybeerId);
    expect(response.body.mybeer.userId.nickname).toBe(nickname);
});

it ("get one specific mybeer - fail (wrong mybeer id)", async () => {
    const response = await request(app).get(`/${key}/api/mybeer/${wrongId}`)
    .auth(token, { type: 'bearer' })
    .send();;

    expect(response.body.message).toBe("fail");
    expect(response.body.error).toBe("no existed mybeer");
});

it ("modify one mybeer - success", async () => {
    let beer = await Beers.findOne({ _id: beerId });
    const countBefore = beer.count;
    const avgRateBefore = beer.avgRate;

    let beerCategory = await BeerCategories.findOne({ _id: beer.categoryId });
    const avgRateCategoryBefore = beerCategory.avgRate["Unknown"][0];
    const countCategoryBefore = beerCategory.avgRate["Unknown"][1];

    const response = await request(app).put(`/${key}/api/mybeer/${mybeerId}`)
    .auth(token, { type: 'bearer' })
    .send({
        myFeatures, location, rate: 4, review: "modified review"
    });

    beer = await Beers.findOne({ _id: beerId });
    const countAfter = beer.count;
    const avgRateAfter = beer.avgRate;

    beerCategory = await BeerCategories.findOne({ _id: beer.categoryId });
    const avgRateCategoryAfter = beerCategory.avgRate["Unknown"][0];
    const countCategoryAfter = beerCategory.avgRate["Unknown"][1];

    const avgRate = (( countBefore * avgRateBefore ) - rate + 4) / countBefore;
    const avgRateCategory = (( countCategoryBefore * avgRateCategoryBefore ) - rate + 4) / countCategoryBefore;

    expect(response.body.message).toBe("success");
    expect(countAfter).toBe(countBefore);
    expect(avgRate).toBe(avgRateAfter);
    expect(countCategoryAfter).toBe(countCategoryBefore);
    expect(avgRateCategory).toBe(avgRateCategoryAfter);
    expect(response.body.myBeerId).toBe(mybeerId);
});

it ("modify one mybeer - fail (wrong id)", async () => {
    const response = await request(app).put(`/${key}/api/mybeer/${wrongId}`)
    .auth(token, { type: 'bearer' })
    .send({
        myFeatures, location, rate: 4, review: "modified review"
    });

    expect(response.body.message).toBe("fail");
    expect(response.body.error).toBe("wrong mybeer id");
});

it ("modify one mybeer - fail (wrong user)", async () => {
    const response = await request(app).put(`/${key}/api/mybeer/${mybeerId}`)
    .auth(anothertoken, { type: 'bearer' })
    .send({
        myFeatures, location, rate: 4, review: "modified review"
    });

    expect(response.body.message).toBe("fail");
    expect(response.body.error).toBe("not the same user");
});

it ("delete one mybeer - fail (wrong user)", async () => {
    const response = await request(app).delete(`/${key}/api/mybeer/${mybeerId}`)
    .auth(anothertoken, { type: 'bearer' })
    .send();

    expect(response.body.message).toBe("fail");
    expect(response.body.error).toBe("not the same user");
});

it ("delete one mybeer - fail (wrong id)", async () => {
    const response = await request(app).delete(`/${key}/api/mybeer/${wrongId}`)
    .auth(anothertoken, { type: 'bearer' })
    .send();

    expect(response.body.message).toBe("fail");
    expect(response.body.error).toBeTruthy();
    //expect(response.body.error).toBe("wrong mybeer id");
});

it ("delete one mybeer - success", async () => {
    let beer = await Beers.findOne({ _id: beerId });
    const countBefore = beer.count;
    const avgRateBefore = beer.avgRate;

    let beerCategory = await BeerCategories.findOne({ _id: beer.categoryId });
    const avgRateCategoryBefore = beerCategory.avgRate["Unknown"][0];
    const countCategoryBefore = beerCategory.avgRate["Unknown"][1];

    const response = await request(app).delete(`/${key}/api/mybeer/${mybeerId}`)
    .auth(token, { type: 'bearer' })
    .send();

    beer = await Beers.findOne({ _id: beerId });
    const countAfter = beer.count;
    const avgRateAfter = beer.avgRate;

    beerCategory = await BeerCategories.findOne({ _id: beer.categoryId });
    const avgRateCategoryAfter = beerCategory.avgRate["Unknown"][0];
    const countCategoryAfter = beerCategory.avgRate["Unknown"][1];

    let avgRate = 0;
    let avgRateCategory = 0;

    if (countBefore > 1) {
        avgRate = (( countBefore * avgRateBefore ) - rate) / ( countBefore - 1);
        avgRateCategory = (( countCategoryBefore * avgRateCategoryBefore ) - rate) / ( countCategoryBefore - 1); 
        console.log("test:", countCategoryBefore, avgRateCategoryBefore, rate, countCategoryBefore);   
    }
    
    expect(response.body.message).toBe("success");
    expect(countBefore - countAfter).toBe(1);
    expect(avgRate).toBe(avgRateAfter);
    expect(countCategoryBefore - countCategoryAfter).toBe(1);
    expect(avgRateCategory).toBe(avgRateCategoryAfter);
});

it ("signout - success", async () => {
    const response = await request(app).delete(`/${key}/api/user`)
        .auth(token, { type: 'bearer' })
        .send();

    const response2 = await request(app).delete(`/${key}/api/user`)
        .auth(anothertoken, { type: 'bearer' })
        .send();

    expect(response2.body.message).toBe("success");
});