import request from "supertest";
import { app } from "../app";
import { disconnect } from "../schemas";
import { secretAPIkey } from '../ssl/secretAPI';
const key = secretAPIkey();
import Users from "../schemas/user";

let token = "";
let userId = "";


it ("register success", async () => {
    const response = await request(app).post(`/api/user`)
        .set('secretkey', key)
        .send({
            email: "usertest@test.com",
            nickname: "test",
            password: "test1234",
            confirmPassword: "test1234"
        });

    expect(response.body.message).toBe("success");
    expect(response.statusCode).toBe(201); 
});

it ("register fail - missing one", async () => {
    const response = await request(app).post(`/api/user`)
        .set('secretkey', key)
        .send({
            nickname: "test22",
            password: "test1234",
            confirmPassword: "test1234"
        });

    expect(response.body.message).toBe("fail");
});

it ("register fail - exited user", async () => {
    const response = await request(app).post(`/api/user`)
        .set('secretkey', key)
        .send({
            email: "usertest@test.com",
            nickname: "test",
            password: "test1234",
            confirmPassword: "test1234"
        });

    expect(response.body.message).toBe("fail");
    expect(response.body.error).toBe("existed user");
});

it ("register fail - wrong email", async () => {
    const response = await request(app).post(`/api/user`)
        .set('secretkey', key)
        .send({
            email: "testtest.com",
            nickname: "testuu",
            password: "test1234",
            confirmPassword: "test1234"
        });

    expect(response.body.message).toBe("fail");
    expect(response.body.error).toBe('\"email\" must be a valid email');
});

it ("login success", async () => {
    const response = await request(app).post(`/api/user/auth`)
        .set('secretkey', key)
        .send({
            email: "usertest@test.com",
            password: "test1234"
        });

    token = response.body.token;
    userId = response.body.userId;

    expect(response.body.message).toBe("success");
    expect(response.body.token).toBeTruthy();
});

it ("login fail - wrong email", async () => {
    const response = await request(app).post(`/api/user/auth`)
        .set('secretkey', key)
        .send({
            email: "wrongemail@test.com",
            password: "test1234"
        });

    expect(response.body.message).toBe("fail");
    expect(response.statusCode).toBe(401);
});

it ("login fail - wrong password", async () => {
    const response = await request(app).post(`/api/user/auth`)
        .set('secretkey', key)
        .send({
            email: "usertest@test.com",
            password: "asdf1234"
        });

    expect(response.body.message).toBe("fail");
    expect(response.statusCode).toBe(401);
});

it ("check if user is authorized - success", async () => {
    const response = await request(app).get(`/api/user/me`)
        .set('secretkey', key)
        .auth(token, { type: 'bearer' })
        .send();

    expect(response.body.message).toBe("success");
    expect(response.body.nickname).toBe("test");
});

it ("check if user is authorized - empty token", async () => {
    const response = await request(app).get(`/api/user/me`)
        .set('secretkey', key)
        .auth("asdf", { type: 'bearer' })
        .send();

    expect(response.body.message).toBe("fail");
    expect(response.statusCode).toBe(401);
    expect(response.body.error).toBeTruthy();
});

it ("check if user is authorized - empty token scheme", async () => {
    const response = await request(app).get(`/api/user/me`)
        .set('secretkey', key)
        .send();

    expect(response.body.message).toBe("fail");
    expect(response.body.error).toBe("unidentified user");
    expect(response.statusCode).toBe(401);
});

it ("gives test result - success", async () => {
    const response = await request(app).post(`/api/user/test`)
        .set('secretkey', key)
        .send({
            userId: userId,
            result: "IPA"
        });

    const user = await Users.findOne({ _id: userId });

    expect(response.body.message).toBe("success");
    expect(response.body.user).toBe(true);
    expect(response.body.category.name).toBe("IPA");
    expect(response.body.recommendations.length).toBe(2);
    expect(user.preference).toBe("IPA");
});

it ("gives test result - success (no user is fine)", async () => {
    const response = await request(app).post(`/api/user/test`)
        .set('secretkey', key)
        .send({
            result: "IPA"
        });

    const user = await Users.findOne({ _id: userId });

    expect(response.body.message).toBe("success");
    expect(response.body.user).toBe(true);
    expect(response.body.category.name).toBe("IPA");
    expect(response.body.recommendations.length).toBe(2);
});

it ("gives test result - fail (no result)", async () => {
    const response = await request(app).post(`/api/user/test`)
        .set('secretkey', key)
        .send({
            userId: userId
        });

    expect(response.body.message).toBe("fail");
    expect(response.body.error).toBe("test result doesn't exist");
});

it ("gives test result - fail (wrong result)", async () => {
    const response = await request(app).post(`/api/user/test`)
        .set('secretkey', key)
        .send({
            userId: userId,
            result: "wrong result"
        });

    expect(response.body.message).toBe("fail");
    expect(response.body.error).toBe("Beer Category doesn't exist");
});

it ("signout - success", async () => {
    const response = await request(app).delete(`/api/user`)
        .set('secretkey', key)
        .auth(token, { type: 'bearer' })
        .send();

    expect(response.body.message).toBe("success");
});

it ("signout - invalid user - fail", async () => {
    const response = await request(app).delete(`/api/user`)
        .set('secretkey', key)
        .auth("asdf", { type: 'bearer' })
        .send();

    expect(response.body.message).toBe("fail");
    expect(response.statusCode).toBe(401);
    expect(response.body.error).toBeTruthy();
});

 // Disconnect Mongoose
 afterAll( async () => {
    await disconnect()
})