import jwt from "jsonwebtoken";
import Users from "../schemas/user";
import passportRouter from "passport";
import KakaoStrategy, { Strategy } from "passport-kakao";

const kakaoPassportConfig = () => {
    passportRouter.serializeUser((user, done) => {
        done(null, user);
    });
    
    passportRouter.deserializeUser((user: any, done) => {
        done(null, user);
    });

    // https://kauth.kakao.com/oauth/authorize?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5209%2Fapi%2Fuser%2Fkakao%2Fcallback&client_id=e37e7e15c49d382837d031d60c753b43

    passportRouter.use(new Strategy({
        clientID: "e37e7e15c49d382837d031d60c753b43",
        clientSecret: "13fdRoU16v1eX7rJm2u1HaNZ8ICy1xkO",
        callbackURL: "http://localhost:5209/api/user/kakao/callback"
    },
    async function(accessToken, refreshToken, profile, done) {
        const userId = String(profile.id);
        const nickname = profile.username;
        const provider = profile.provider;
        let email:String;

        if (profile._json.kakao_account.has_email && profile._json.kakao_account.is_email_valid) {
            email = profile._json.kakao_account.email;
        } else {
            email = "";
        }

        let user = await Users.findOne({passport: [{provider: "kakao"}, {id: userId}]});

        if (!user) {
            user = await Users.create({ nickname, email, passport: [{ provider: provider }, { id: userId }] });
        }

        const _id = user._id;
        const token = jwt.sign({ userId: _id }, "bananatulip");

        return done(null, profile, { message: token });
    }
    ));
}

export { kakaoPassportConfig };