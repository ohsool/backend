import request from "supertest";
// import { app } from "../app";
import { app } from "./test-app";
import { disconnect } from "../schemas";
// import { secretAPIkey } from '../ssl/secretAPI';
// const key = secretAPIkey();

let refresh = "";
let access = "";

const email = "slackwebkittest@test.com"
const nickname = "slackwebkittest";
const password = "recommendationtesttest1234";
const confirmPassword = "recommendationtesttest1234";

// it ("register success, get beer id, get beercategory id", async () => {
//     const response = await request(app).post(`/api/user`)
//         .set('secretkey', key)
//         .send({ email, nickname, password, confirmPassword });

//     console.log("🍻", email, nickname, password, confirmPassword, response.body);

//     expect(response.body.message).toBe("success");
//     expect(response.statusCode).toBe(201); 
// });

it ("login success", async () => {
    const response = await request(app).post(`/api/user/auth`)
        // .set('secretkey', key)
        .send({ email, password });

    refresh = response.body.refreshToken;
    access = response.body.accessToken;

    expect(response.body.message).toBe("success");
    expect(response.body.refreshToken).toBeTruthy();
    expect(response.body.accessToken).toBeTruthy();
});

it ("send beer recommendation to slack - success", async () => {
    console.log("🍻", refresh, access);

    const response = await request(app).post(`/api/recommendation`)
        // .set('secretkey', key)
        .set('refresh', `Bearer ${refresh}`)
        .set('access', `Bearer ${access}`)
        .send({
            beer: "test beer",
            description: "beer recommendation testing",
            location: "test location",
            image: "https://miro.medium.com/max/796/1*P_zZlof7IhiohKQ7QEaXzA.png"
        });

    console.log(response.body);

    expect(response.body.message).toBe("success");
    expect(response.body.result).toBeTruthy();
});

it ("send beer complaint to slack - success", async () => {
    const response = await request(app).post(`/api/complaint`)
        // .set('secretkey', key)  
        .set('refresh', `Bearer ${refresh}`)
        .set('access', `Bearer ${access}`)
        .send({
            title: "test complaint",
            description: "complaint testing"
        });

    console.log(response.body);

    expect(response.body.message).toBe("success");
    expect(response.body.result).toBeTruthy();
});

// it ("signout - success", async () => {
//     const response = await request(app).delete(`/${key}/api/user`)
//         .auth(token, { type: 'bearer' })
//         .send();

//     expect(response.body.message).toBe("success");
// });

 // Disconnect Mongoose
 afterAll( async () => {
    await disconnect()
})