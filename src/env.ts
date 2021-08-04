require("dotenv").config({
    path: `config/.env.${process.env.NODE_ENV || "development" }`,
});

export const env = {
    modeNow: process.env.NODE_ENV,
    isDevelopment: process.env.NODE_ENV === "development",
    isProduction: process.env.NODE_ENV === "production",
    isTest: process.env.NODE_ENV === "test",
    port: process.env.PORT,
    url: String(process.env.URL),
    clientId_kakao: String(process.env.CLIENTID_KAKAO),
    clientSecret_kakao: String(process.env.CLIENTSECRET_KAKAO),
    callbackUrl_kakao: String(process.env.CALLBACKURL_KAKAO),
    clientId_google: String(process.env.CLIENTID_GOOGLE),
    clientSecret_google: String(process.env.CLIENTSECRET_GOOGLE),
    callbackUrl_google: String(process.env.CALLBACKURL_GOOGLE),
    botUserOAuthToken: String(process.env.BOTUSEROAUTHTOKEN),
    user: String(process.env.USER),
    pass: String(process.env.PASS)
};