require("dotenv").config({
    path: `config/.env.${process.env.NODE_ENV || "development" }`,
});

export const env = {
    isDevelopment: process.env.NODE_ENV === "development",
    isProduction: process.env.NODE_ENV === "production",
    isTest: process.env.NODE_ENV === "test",
    port: process.env.PORT,
    url: String(process.env.URL)

};