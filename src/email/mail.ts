import nodemailer from 'nodemailer';
import { env } from "../env";
import fs from "fs";
import { promisify } from 'util';


const readFile = promisify(fs.readFile);
export const mailSender = async (mailInfo: any) => {

    // 메일 발송 함수
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 486,
        host: 'smtp.gmail.com',
        secure: false,
        requireTLS: true,
        auth: {
            // user: env.email_id,
            // pass: env.email_pw
            user: "ysong0504@gmail.com",
            pass: "dbsthd0724!"
        }
    });

    // 메일 옵션
    const mailOptions = {
        from: "admin@ohsool.com",
        to: mailInfo.toEmail,
        subject: mailInfo.subject,
        // html: `<h1>${mailInfo.nickname} 님 반가워요!</h1>`
        html: await readFile(__dirname + '/./welcome.html', 'utf8')
    }
    // 메일 발송
    transporter.sendMail(mailOptions, (error, info) =>{
        if (error) { console.log(error); }
        else { console.log('email sent successfully')}
    })

 
}
