import request from "supertest";
import { app } from "../app";

import { secretAPIkey } from '../ssl/secretAPI';
const key = secretAPIkey();

let token = "";

const email = "recommendationtest@test.com"
const nickname = "recommendationtesttest";
const password = "recommendationtesttest1234";
const confirmPassword = "recommendationtesttest1234";

it ("register success, get beer id, get beercategory id", async () => {
    const response = await request(app).post(`/${key}/api/user`)
        .send({ email, nickname, password, confirmPassword });

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

it ("send beer recommendation to slack - success", async () => {
    const response = await request(app).post(`/${key}/api/recommendation`)
        .auth(token, { type: 'bearer' })
        .send({
            beer: "test beer",
            description: "beer recommendation testing",
            location: "test location",
            image: "https://miro.medium.com/max/796/1*P_zZlof7IhiohKQ7QEaXzA.png"
        });

    expect(response.body.message).toBe("success");
    expect(response.body.result).toBeTruthy();
});

it ("send beer complaint to slack - success", async () => {
    const response = await request(app).post(`/${key}/api/complaint`)
        .auth(token, { type: 'bearer' })
        .send({
            title: "test complaint",
            description: "complaint testing"
        });

    expect(response.body.message).toBe("success");
    expect(response.body.result).toBeTruthy();
});

it ("signout - success", async () => {
    const response = await request(app).delete(`/${key}/api/user`)
        .auth(token, { type: 'bearer' })
        .send();

    expect(response.body.message).toBe("success");
});