import request from "supertest";
// import { app } from "../app";
import { app } from "./test-app";
import { disconnect } from "../schemas";
import { IBeer } from "../interfaces/beer";
import { IBeerCategory } from "../interfaces/beerCategory";
// import { secretAPIkey } from '../ssl/secretAPI';
// const key = secretAPIkey();

it ("get auto-complete beer name search - success", async () => {
    const response = await request(app).get(encodeURI(`/api/search?word=미`))
        // .set('secretkey', key)

    const beers: Array<IBeer> = response.body.beers;
    const beerCategories: Array<IBeerCategory> = response.body.beerCategories;
    const hashtags: Array<Array<string>> = response.body.hashtags;

    expect(response.body.message).toBe("success");
    expect(Array.isArray(response.body.beers)).toBe(true);
    expect(Array.isArray(response.body.beerCategories)).toBe(true);
    expect(Array.isArray(response.body.hashtags)).toBe(true);
    // expect(beers.includes("밀러 라이트")).toBe(true);
    // expect(beers.includes("버드와이저")).toBe(false);
});

it ("get auto-complete beer category search - success", async () => {
    const response = await request(app).get(`/api/search?word=la`)
        // .set('secretkey', key)

    const beers: Array<IBeer> = response.body.beers;
    const beerCategories: Array<IBeerCategory> = response.body.beerCategories;
    const hashtags: Array<Array<string>> = response.body.hashtags;

    expect(response.body.message).toBe("success");
    expect(Array.isArray(response.body.beers)).toBe(true);
    expect(Array.isArray(response.body.beerCategories)).toBe(true);
    expect(Array.isArray(response.body.hashtags)).toBe(true);
    // expect(beerCategories.includes("Lager")).toBe(true);
    // expect(beerCategories.includes("IPA")).toBe(false);
});

it ("get auto-complete hashtag search - success", async () => {
    const response = await request(app).get(encodeURI("/api/search?hashtag=호"))

    const beers: Array<IBeer> = response.body.beers;
    const beerCategories: Array<IBeerCategory> = response.body.beerCategories;
    const hashtags: Array<string> = response.body.hashtags;

    expect(response.body.message).toBe("success");
    expect(Array.isArray(response.body.beers)).toBe(true);
    expect(Array.isArray(response.body.beerCategories)).toBe(true);
    expect(Array.isArray(response.body.hashtags)).toBe(true);
    expect(hashtags.includes("황금색")).toBe(true);
    expect(hashtags.includes("쌉쌀한맛")).toBe(false);
});

it ("get auto-complete hashtag search - success", async () => {
    const response = await request(app).get(encodeURI("/api/search/hashtag?hashtag=황금색"))

    const beers = response.body.beers;

    expect(response.body.message).toBe("success");
    expect(Array.isArray(response.body.beers)).toBe(true);
    expect(beers.length).toBe(19);
    expect(beers[0].name_english).toBe("Budweiser");
});

 // Disconnect Mongoose
 afterAll( async () => {
    await disconnect()
})