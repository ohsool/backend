import request from "supertest";
import { app } from "../app";
import { disconnect } from "../schemas";

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
const modified_rate = 4;
const review = "test mybeer";

const email = "mybeertest@test.com"
const nickname = "mybeertest";
const password = "mybeertest1234";
const confirmPassword = "mybeertest1234";

const wrongId = "610e5058dc866bf2e5db6334";

// it ("register success, get beer id, get beercategory id", async () => {
//     const response = await request(app).post(`/api/user`)
//         .set('secretkey', key)
//         .send({ email, nickname, password, confirmPassword });

//     const beer = await Beers.findOne({ name_korean: "버드와이저" });
//     beerId = beer._id;
//     beerCategoryId = beer.categoryId;

//     expect(response.body.message).toBe("success");
//     expect(response.statusCode).toBe(201); 
// });

it ("login success", async () => {
    const response = await request(app).post(`/api/user/auth`)
        .set('secretkey', key)
        .send({ 
            email: "mybeertest@test.com",
            password: "mybeertest1234" 
        });

    token = response.body.token;

    const beer = await Beers.findOne({ name_korean: "버드와이저" });
    beerId = beer._id;
    beerCategoryId = beer.categoryId;

    expect(response.body.message).toBe("success");
    expect(response.body.token).toBeTruthy();
});

// it ("another register success, get beer id, get beercategory id", async () => {
//     const response = await request(app).post(`/api/user`)
//         .set('secretkey', key)
//         .send({ 
//             email: "anothermybeertest@test.com",
//             nickname: "anothermybeertest22",
//             password: "mybeertest1234", 
//             confirmPassword: "mybeertest1234"
//         });

//     const beer = await Beers.findOne({ name_korean: "버드와이저" });
//     beerId = beer._id;
//     beerCategoryId = beer.categoryId;

//     expect(response.body.message).toBe("success");
//     expect(response.statusCode).toBe(201); 
// });

it ("another login success", async () => {
    const response = await request(app).post(`/api/user/auth`)
        .set('secretkey', key)
        .send({
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

    const response = await request(app).post(`/api/mybeer/${beerId}`)
        .set('secretkey', key)
        .auth(token, { type: 'bearer' })
        .send({ myFeatures, location, rate, review });

    mybeerId = response.body.mybeer._id;

    beer = await Beers.findOne({ _id: beerId });
    const countAfter = beer.count;
    const avgRateAfter = beer.avgRate;

    beerCategory = await BeerCategories.findOne({ _id: beer.categoryId });
    const avgRateCategoryAfter = beerCategory.avgRate["Unknown"][0];
    const countCategoryAfter = beerCategory.avgRate["Unknown"][1];

    const avgRate = (( countBefore * avgRateBefore ) + rate) / (countBefore + 1);
    const avgRateCategory = (( countCategoryBefore * avgRateCategoryBefore ) + rate) / (countCategoryBefore + 1);

    console.log("1️⃣", countAfter, avgRateAfter);
    console.log("1️⃣", countCategoryAfter, avgRateCategoryAfter);

    expect(response.body.message).toBe("success");
    expect(countAfter - countBefore).toBe(1);
    expect(avgRate).toBe(avgRateAfter);
    expect(countCategoryAfter - countCategoryBefore).toBe(1);
    expect(avgRateCategory).toBe(avgRateCategoryAfter);
    expect(response.body.mybeer).toBeTruthy();
});

it ("post mybeer - fail (beer doesn't exist)", async () => {
    const response = await request(app).post(`/api/mybeer/${wrongId}`)
        .set('secretkey', key)
        .auth(token, { type: 'bearer' })
        .send({ myFeatures, location, rate, review });

    expect(response.body.message).toBe("fail");
    expect(response.body.error).toBe("beer doesn't exist");
});

it ("post mybeer - fail (no rate)", async () => {
    const response = await request(app).post(`/api/mybeer/${beerId}`)
        .set('secretkey', key)
        .auth(token, { type: 'bearer' })
        .send({ myFeatures, location, review });

    expect(response.body.message).toBe("fail");
    expect(response.body.error).toBe("Either beer or myFeatures or rate doesn't exist.");
});

it ("post mybeer - fail (review too long)", async () => {
    const response = await request(app).post(`/api/mybeer/${beerId}`)
        .set('secretkey', key)
        .auth(token, { type: 'bearer' })
        .send({
            myFeatures, location, rate, review: "test mybeer review too long test mybeer review too long test mybeer review too long test mybeer review too long test mybeer review too long test mybeer review too long test mybeer review too long"
        });

    expect(response.body.message).toBe("fail");
    expect(response.body.error).toBe("the length of the review must be under 48");
});

it ("get all mybeers - success", async () => {
    const response = await request(app).get(`/api/mybeer/all`)
        .set('secretkey', key)
        .auth(token, { type: 'bearer' })
        .send();

    expect(response.body.message).toBe("success");
    expect(response.body.mybeers).toBeTruthy();
    expect(Array.isArray(response.body.mybeers)).toBe(true);
});

it ("get my mybeers - success", async () => {
    const response = await request(app).get(`/api/mybeer/my`)
        .set('secretkey', key)
        .auth(token, { type: 'bearer' })
        .send();

    expect(response.body.message).toBe("success");
    expect(response.body.mybeers).toBeTruthy();
    expect(Array.isArray(response.body.mybeers)).toBe(true);
});

it ("get specific beer's mybeers - success", async () => {
    const response = await request(app).get(`/api/mybeer/beer/${beerId}`)
        .set('secretkey', key)
        .auth(token, { type: 'bearer' })
        .send();

    expect(response.body.message).toBe("success");
    expect(response.body.mybeers).toBeTruthy();
    expect(Array.isArray(response.body.mybeers)).toBe(true);
});

it ("get specific beer's mybeers - fail (wrong beerId)", async () => {
    const response = await request(app).get(`/api/mybeer/beer/${wrongId}`)
        .set('secretkey', key)
        .auth(token, { type: 'bearer' })
        .send();

    expect(response.body.message).toBe("fail");
    expect(response.body.error).toBe("beer doesn't exist");
});

it ("get one specific mybeer - success", async () => {
    const response = await request(app).get(`/api/mybeer/${mybeerId}`)
        .set('secretkey', key)
        .auth(token, { type: 'bearer' })
        .send();

    expect(response.body.message).toBe("success");
    expect(response.body.mybeer).toBeTruthy();
    expect(response.body.mybeer._id).toBe(mybeerId);
    expect(response.body.mybeer.userId.nickname).toBe(nickname);
});

it ("get one specific mybeer - fail (wrong mybeer id)", async () => {
    const response = await request(app).get(`/api/mybeer/${wrongId}`)
        .set('secretkey', key)
        .auth(token, { type: 'bearer' })
        .send();

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

    const response = await request(app).put(`/api/mybeer/${mybeerId}`)
        .set('secretkey', key)
        .auth(token, { type: 'bearer' })
        .send({
            myFeatures, location, rate, review: "modified review"
        });

    beer = await Beers.findOne({ _id: beerId });
    const countAfter = beer.count;
    const avgRateAfter = beer.avgRate;

    beerCategory = await BeerCategories.findOne({ _id: beer.categoryId });
    const avgRateCategoryAfter = beerCategory.avgRate["Unknown"][0];
    const countCategoryAfter = beerCategory.avgRate["Unknown"][1];

    const avgRate = (( countBefore * avgRateBefore ) - rate + modified_rate) / countBefore;
    const avgRateCategory = (( countCategoryBefore * avgRateCategoryBefore ) - rate + modified_rate) / countCategoryBefore;

    console.log("2️⃣", countAfter, avgRateAfter);
    console.log("2️⃣", countCategoryAfter, avgRateCategoryAfter);

    expect(response.body.message).toBe("success");
    expect(countAfter).toBe(countBefore);
    // expect(avgRate).toBe(avgRateAfter);
    expect(countCategoryAfter).toBe(countCategoryBefore);
    // expect(avgRateCategory).toBe(avgRateCategoryAfter);
    expect(response.body.myBeerId).toBe(mybeerId);
});

it ("modify one mybeer - fail (wrong id)", async () => {
    const response = await request(app).put(`/api/mybeer/${wrongId}`)
        .set('secretkey', key)
        .auth(token, { type: 'bearer' })
        .send({
            myFeatures, location, rate: 4, review: "modified review"
        });

    expect(response.body.message).toBe("fail");
    expect(response.body.error).toBe("wrong mybeer id");
});

it ("modify one mybeer - fail (wrong user)", async () => {
    const response = await request(app).put(`/api/mybeer/${mybeerId}`)
        .set('secretkey', key)
        .auth(anothertoken, { type: 'bearer' })
        .send({
            myFeatures, location, rate: 4, review: "modified review"
        });

    expect(response.body.message).toBe("fail");
    expect(response.body.error).toBe("not the same user");
});

it ("delete one mybeer - fail (wrong user)", async () => {
    const response = await request(app).delete(`/api/mybeer/${mybeerId}`)
        .set('secretkey', key)
        .auth(anothertoken, { type: 'bearer' })
        .send();

    expect(response.body.message).toBe("fail");
    expect(response.body.error).toBe("not the same user");
});

it ("delete one mybeer - fail (wrong id)", async () => {
    const response = await request(app).delete(`/api/mybeer/${wrongId}`)
        .set('secretkey', key)
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

    const response = await request(app).delete(`/api/mybeer/${mybeerId}`)
        .set('secretkey', key)
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
        avgRate = (( countBefore * avgRateBefore ) - modified_rate) / ( countBefore - 1);
        avgRateCategory = (( countCategoryBefore * avgRateCategoryBefore ) - modified_rate) / ( countCategoryBefore - 1); 
    }

    console.log("3️⃣", countAfter, avgRateAfter);
    console.log("3️⃣", countCategoryAfter, avgRateCategoryAfter);

    expect(response.body.message).toBe("success");
    expect(countCategoryBefore - countCategoryAfter).toBe(1);
    // expect(avgRateCategory).toBe(avgRateCategoryAfter);
    expect(countBefore - countAfter).toBe(1);
    // expect(avgRate).toBe(avgRateAfter);
});

// it ("signout - success", async () => {
//     const response = await request(app).delete(`/api/user`)
//         .set('secretkey', key)
//         .auth(token, { type: 'bearer' })
//         .send();

//     console.log("response1:", response.body);

//     const response2 = await request(app).delete(`/api/user`)
//         .set('secretkey', key)
//         .auth(anothertoken, { type: 'bearer' })
//         .send();
    
//     console.log("response2:", response2.body)

//     expect(response.body.message).toBe("success");
//     expect(response2.body.message).toBe("success");
// });

 // Disconnect Mongoose
 afterAll( async () => {
    await disconnect()
})