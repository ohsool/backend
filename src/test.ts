import crypto from "crypto";

const header = {
    "typ": "JWT",
    "alg": "HS256"
};

const encodedHeader = new Buffer(JSON.stringify(header))
    .toString('base64')
    .replace("=", "")

console.log("header:", encodedHeader);

const payload = {
    issuer: "node-avengers",
    expiresIn: "14d",
    "https://ohsool.com/jwt_claims/is_valid": true,
    nickname: "garden"
}

const encodedPayload = new Buffer(JSON.stringify(payload))
    .toString('base64')
    .replace("=", "")

console.log("payload:", encodedPayload);

const signature = crypto.createHmac('sha256', 'signatureSecret')
    .update(encodedHeader + "." + encodedPayload)
    .digest("base64")
    .replace("=", "");

console.log("signature:", signature);

console.log("JWT:", encodedHeader + "." + encodedPayload + "." + signature);