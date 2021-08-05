import crypto from "crypto";

export const secretAPIkey = ( ) => {
    const time = new Date();
    const key = String(time.getDate()) + String(time.getHours()) + String(time.getUTCFullYear()) + String(time.getUTCHours());

    return crypto.createHmac('sha256', key).digest('base64');
};