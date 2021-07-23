import express, { Request, Response, NextFunction, Router, response } from "express";
import Users from "../schemas/user";

import joi from "joi";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userRouter = express.Router();

const joiSchema = joi.object({
    email: joi
      .string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    nickname: joi.string().min(3).max(30).required(),
    password: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{4,30}$")),
    confirmPassword: joi.ref("password")
  });

  // register
  userRouter.post("/", async (req, res) => {
      const { email, nickname, password, confirmPassword } = req.body;
    
      try {
        const existUser = await Users.findOne({ nickname, email });

        if (existUser) {
            res.json({ message: "fail" });
  
            return;
        }
      } catch(err) {
          res.json({ message: "fail", err });
      }

      const { value, error } = joiSchema.validate({
        email, nickname, password, confirmPassword
      });

      if (!error) {
          const crypted_password = crypto.createHmac("sha256", password).update("¡hellosnail!").digest("hex");

          await Users.create({ email, nickname, password: crypted_password });

          res.json({ message: "success" });
      } else {
          res.json({ message: "fail", err: error.details[0].message });
      }
  })

  export { userRouter };