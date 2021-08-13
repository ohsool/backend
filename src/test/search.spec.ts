import request from "supertest";
import { app } from "../app";
import { disconnect } from "../schemas";
import { secretAPIkey } from '../ssl/secretAPI';
const key = secretAPIkey();

it ("get auto-complete beer name search - success", async () => {
    const response = await request(app).get(encodeURI(`/api/search?word=미`))
        .set('secretkey', key)

    const words = response.body.words;

    expect(response.body.message).toBe("success");
    expect(Array.isArray(response.body.words)).toBe(true);
    expect(words.includes("밀러 라이트")).toBe(true);
    expect(words.includes("버드와이저")).toBe(false);
});

it ("get auto-complete beer category search search - success", async () => {
    const response = await request(app).get(`/api/search?word=la`)
        .set('secretkey', key)

    const words = response.body.words;

    expect(response.body.message).toBe("success");
    expect(Array.isArray(response.body.words)).toBe(true);
    expect(words.includes("Lager")).toBe(true);
    expect(words.includes("IPA")).toBe(false);
});

 // Disconnect Mongoose
 afterAll( async () => {
    await disconnect()
})