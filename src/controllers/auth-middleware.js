"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../schemas/user"));
function authMiddleware(req, res, next) {
    const { authorization } = req.headers;
    console.log("1", authorization);
    try {
        if (!authorization) {
            res.status(401).json({ message: "fail", error: "unidentified user" });
            return;
        }
        const tokenArray = authorization.split(" ");
        const tokenScheme = tokenArray[0];
        const tokenValue = tokenArray[1];
        console.log("2", tokenScheme);
        if (tokenScheme != "Bearer") {
            res.status(401).json({ message: "fail", error: "unidentified token schema" });
            return;
        }
        const userVerified = jsonwebtoken_1.default.verify(tokenValue, "bananatulip");
        console.log("3", userVerified);
        const userId = userVerified.userId;
        user_1.default.findOne({ _id: userId })
            .then((result) => {
            console.log("4", result);
            if (result) {
                res.locals.user = result;
                next();
            }
            else {
                res.status(401).json({ message: "fail", error: "no existed user" });
            }
        }).catch((error) => {
            console.log("5", error);
            res.status(401).json({ message: "fail", error });
        });
    }
    catch (error) {
        console.log("6", error);
        res.status(401).json({ message: "fail", error });
    }
}
exports.authMiddleware = authMiddleware;
