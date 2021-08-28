import jwt from "jsonwebtoken";
import Users from "../schemas/user";
import passportRouter from "passport";
import GoogleStrategy, { Strategy } from "passport-google-oauth2";
import { mailSender }  from '../email/mail'
import { env } from "../env";
import { IMailInfo } from "../interfaces/mail";

const googlePassportConfig = () => {
    passportRouter.serializeUser((user, done) => {
        done(null, user);
    });

    passportRouter.deserializeUser((user: any, done) => {
        done(null, user);
    });

    passportRouter.use(new Strategy({
        clientID: env.clientId_google,
        clientSecret: env.clientSecret_google,
        callbackURL: env.callbackUrl_google
    },
    async function(accessToken, refreshToken, profile, done: GoogleStrategy.VerifyCallback) {
        const userId = profile.id;
        const email = profile.email;
        const nickname = profile.name.givenName;
        const provider = profile.provider;
        let first = false;

        let user = await Users.findOne({passport: [{provider: "google"}, {id: userId}]});

        if (!user) {
            user = await Users.create({ email, nickname, passport: [{ provider: provider }, { id: userId }] });

            const mailInfo: IMailInfo = {
                toEmail: email,     
                nickname: nickname, 
                type: 'welcome',   
            };
    
              // 성공 메일 보내기
            mailSender(mailInfo)

            first = true;
        }

        const _id = user._id;
        const refresh = jwt.sign( {}, 
            env.jwt_secret, { 
              expiresIn: '14d', 
              issuer: 'node-avengers' 
            }
        );
        const access = jwt.sign({ userId: user._id }, 
            env.jwt_secret, {
              expiresIn: '1h',
              issuer: 'node-avengers'
            }
        );

        await Users.findOneAndUpdate({ _id: user._id}, {$set: { refreshToken: refresh }} );

        const tokens = `${refresh}***${access}***${first}`

        return done(null, profile, { message: tokens });
    }
    ));
}

export { googlePassportConfig };
