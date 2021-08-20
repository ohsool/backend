import nodemailer from 'nodemailer';
import { env } from "../env";


export const mailSender = (mailInfo: any) => {

    // 메일 발송 함수
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 486,
        host: 'smtp.gmail.com',
        secure: false,
        requireTLS: true,
        auth: {
            user: env.email_id,
            pass: env.email_pw

        }
    });

    // 메일 옵션
    const mailOptions = {
        from: "admin@ohsool.com",
        to: mailInfo.toEmail,
        subject: mailInfo.subject,
        html: `<h1>${mailInfo.nickname} 님 반가워요!</h1>`
    }

    // 메일 발송
    transporter.sendMail(mailOptions, (error, info) =>{
        if (error) { console.log(error); }
        else { console.log('email sent successfully')}
    })

 
}


// export default { mailSender }