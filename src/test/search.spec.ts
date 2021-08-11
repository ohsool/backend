import request from "supertest";
import { app } from "../app";

import { secretAPIkey } from '../ssl/secretAPI';
const key = secretAPIkey();

it ("get auto-complete beer name search - success", async () => {
    const response = await request(app).get(encodeURI(`/${key}/api/search?word=미`))

    const words = response.body.words;

    expect(response.body.message).toBe("success");
    expect(Array.isArray(response.body.words)).toBe(true);
    expect(words.includes("밀러 라이트")).toBe(true);
    expect(words.includes("버드와이저")).toBe(false);
});

it ("get auto-complete beer category search search - success", async () => {
    const response = await request(app).get(`/${key}/api/search?word=la`)

    const words = response.body.words;

    expect(response.body.message).toBe("success");
    expect(Array.isArray(response.body.words)).toBe(true);
    expect(words.includes("Lager")).toBe(true);
    expect(words.includes("IPA")).toBe(false);
});