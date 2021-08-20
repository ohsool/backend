import mailSender from './mail'

let mailInfo = {
    toEmail: email,     // 수신할 이메일
    subject: 'New Email From Gyunny',   // 메일 제목
    text: `Gyunny 회원님!`                // 메일 내용
  };

const mailInfo = ""
mailSender.sendEmail(mailInfo)