import jwt from "jsonwebtoken";
import Users from "../schemas/user";
import passportRouter from "passport";
import GoogleStrategy, { Strategy } from "passport-google-oauth2";

const googlePassportConfig = () => {
    passportRouter.serializeUser((user, done) => {
        done(null, user);
    });

    passportRouter.deserializeUser((user: any, done) => {
        done(null, user);
    });

    passportRouter.use(new Strategy({
        clientID: "191938571707-m8nhi8j2inb8dn0c0pq99f3gc1hd9sfd.apps.googleusercontent.com",
        clientSecret: "vgLllg0mbn2wmTQu8gR83mqc",
        callbackURL: "http://localhost:5209/api/user/google/callback",
    },
    async function(accessToken, refreshToken, profile, done: GoogleStrategy.VerifyCallback) {
        const userId = profile.id;
        const email = profile.email;
        const nickname = profile.name.givenName;
        const provider = profile.provider;

        let user = await Users.findOne({passport: [{provider: "google"}, {id: userId}]});

        if (!user) {
            user = await Users.create({ email, nickname, passport: [{ provider: provider }, { id: userId }] });
        }

        const _id = user._id;
        const token = jwt.sign({ userId: _id }, "bananatulip");

        return done(null, profile, { message: token });
    }
    ));
}

export { googlePassportConfig };
