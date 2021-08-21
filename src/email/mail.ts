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

    const script = await readFile(__dirname + `/./${mailInfo.type}.html`, 'utf8')
    const new_script = script.replace(/USERNAME/gi, mailInfo.nickname)
    let mail_subject = ""

    if (mailInfo.type === "welcome") {
        mail_subject = `🍻오늘의술 ${mailInfo.nickname}님, 환영합니다!`
    } else {
        mail_subject = `🍻오늘의술 ${mailInfo.nickname}님, 건의사항이 접수되었습니다.`
    }

    // 메일 옵션
    const mailOptions = {
        from: "admin@ohsool.com",
        to: mailInfo.toEmail,
        subject: mail_subject,
        html: new_script
    }
    // 메일 발송
    transporter.sendMail(mailOptions, (error, info) =>{
        if (error) { console.log(error); }
        else { console.log('email sent successfully')}
    })

 
}
