import jwt from "jsonwebtoken";
import Users from "../schemas/user";
import passportRouter from "passport";
import KakaoStrategy, { Strategy } from "passport-kakao";
import { mailSender }  from '../email/mail'
import { env } from "../env";
import { IMailInfo } from "../interfaces/mail";

const kakaoPassportConfig = () => {
    passportRouter.serializeUser((user, done) => {
        done(null, user);
    });
    
    passportRouter.deserializeUser((user: any, done) => {
        done(null, user);
    });

    // https://kauth.kakao.com/oauth/authorize?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5209%2Fapi%2Fuser%2Fkakao%2Fcallback&client_id=e37e7e15c49d382837d031d60c753b43
    passportRouter.use(new Strategy({
        clientID: env.clientId_kakao,
        clientSecret: env.clientSecret_kakao,
        callbackURL: env.callbackUrl_kakao
    },
    async function(accessToken, refreshToken, profile, done) {
        const userId = String(profile.id);
        const nickname = profile.username;
        const provider = profile.provider;
        let email:string;
        let first = false;

        if (profile._json.kakao_account.has_email && profile._json.kakao_account.is_email_valid) {
            email = profile._json.kakao_account.email;
        } else {
            email = "";
        }

        let user = await Users.findOne({passport: [{provider: "kakao"}, {id: userId}]});

        if (!user) {
            user = await Users.create({ nickname, email, passport: [{ provider: provider }, { id: userId }] });

            const mailInfo: IMailInfo = {
                toEmail: email,     
                nickname: nickname ? nickname : "오술 회원님",
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

        return done(null, profile, { refreshToken: refresh, accessToken: access, first });
    }
    ));
}

export { kakaoPassportConfig };