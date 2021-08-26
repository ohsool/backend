import crypto from "crypto";

const unstabletime = new Date();
const time = new Date(unstabletime.toLocaleString("en-US", {timeZone: "America/New_York"}));

console.log(unstabletime);
console.log(time)

let key = String(time.getDate()) + String(time.getHours()) + String(time.getUTCFullYear()) + String(time.getUTCHours());

key = crypto.createHmac('sha256', key).digest('base64');
key = key.replace(/[^a-zA-Z ]/g, "")

console.log(key);