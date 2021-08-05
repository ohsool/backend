import request from "supertest";
import { app } from "../app";

let token = "";

it ("register success", async () => {
    const response = await request(app).post("/api/user").send({
        email: "test@test.com",
        nickname: "test",
        password: "test1234",
        confirmPassword: "test1234"
    });

    expect(response.body.message).toBe("success");
    expect(response.statusCode).toBe(201); 
});

it ("register fail - missing one", async () => {
    const response = await request(app).post("/api/user").send({
        nickname: "test22",
        password: "test1234",
        confirmPassword: "test1234"
    });

    expect(response.body.message).toBe("fail");
});

it ("register fail - exited user", async () => {
    const response = await request(app).post("/api/user").send({
        email: "test@test.com",
        nickname: "test",
        password: "test1234",
        confirmPassword: "test1234"
    });

    expect(response.body.message).toBe("existed user");
});

it ("register fail - wrong email", async () => {
    const response = await request(app).post("/api/user").send({
        email: "testtestcom",
        nickname: "test",
        password: "test1234",
        confirmPassword: "test1234"
    });

    expect(response.body.message).toBe("fail");
    expect(response.body.err).toBe('"email" must be a valid email');
});

it ("login success", async () => {
    const response = await request(app).post("/api/user/auth").send({
        email: "test@test.com",
        password: "test1234"
    });

    token = response.body.token;

    expect(response.body.message).toBe("success");
    expect(response.body.token).toBeTruthy();
});

it ("login fail - wrong email", async () => {
    const response = await request(app).post("/api/user/auth").send({
        email: "wrongemail@test.com",
        password: "test1234"
    });

    expect(response.body.message).toBe("fail");
    expect(response.statusCode).toBe(401);
});

it ("login fail - wrong password", async () => {
    const response = await request(app).post("/api/user/auth").send({
        email: "test@test.com",
        password: "asdf1234"
    });

    expect(response.body.message).toBe("fail");
    expect(response.statusCode).toBe(401);
});

it ("check if user is authorized - success", async () => {
    const response = await request(app).get("/api/user/me")
        .auth(token, { type: 'bearer' })
        .send();

    expect(response.body.message).toBe("success");
    expect(response.body.nickname).toBe("test");
});

it ("check if user is authorized - empty token", async () => {
    const response = await request(app).get("/api/user/me")
        .auth("asdf", { type: 'bearer' })
        .send();

    expect(response.body.message).toBe("fail");
    expect(response.statusCode).toBe(401);
    expect(response.body.err).toBeTruthy();
});

it ("check if user is authorized - empty token scheme", async () => {
    const response = await request(app).get("/api/user/me").send();

    expect(response.body.message).toBe("unidentified user");
    expect(response.statusCode).toBe(401);
});

it ("signout - success", async () => {
    const response = await request(app).delete("/api/user")
        .auth(token, { type: 'bearer' })
        .send();

    expect(response.body.message).toBe("success");
});

it ("signout - invalid user - fail", async () => {
    const response = await request(app).delete("/api/user")
        .auth("asdf", { type: 'bearer' })
        .send();

    expect(response.body.message).toBe("fail");
    expect(response.statusCode).toBe(401);
    expect(response.body.err).toBeTruthy();
});