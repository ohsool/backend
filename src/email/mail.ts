import nodemailer from "nodemailer";
import { env } from "../env";
import fs from "fs";
import { promisify } from "util";
import { string } from "joi";
import { IMailInfo, IMailOption } from "../interfaces/mail";

const readFile = promisify(fs.readFile);

export const mailSender = async (mailInfo: IMailInfo) => {
  // 메일 발송 함수
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 486,
    host: "smtp.gmail.com",
    secure: false,
    requireTLS: true,
    auth: {
      user: env.email_id,
      pass: env.email_pw,
    },
  });

  const script = await readFile(__dirname + `/${mailInfo.type}.html`, "utf8");
  let new_script = script.replace(/USERNAME/gi, mailInfo.nickname);

  if (mailInfo.beer) {
    new_script = new_script.replace(/BEERNAME/gi, mailInfo.beer);
  }
  if (mailInfo.beerId) {
    new_script = new_script.replace(/BEERID/gi, mailInfo.beerId);
  }
  if (mailInfo.feedback) {
    new_script = new_script.replace(/FEEDBACK/gi, mailInfo.feedback);
  }
  if (mailInfo.complaint_title) {
    new_script = new_script.replace(
      /COMPLAINTTITLE/gi,
      mailInfo.complaint_title
    );
  }
  if (mailInfo.complaint_description) {
    new_script = new_script.replace(
      /COMPLAINTDESCRIPTION/gi,
      mailInfo.complaint_description
    );
  }
  if (mailInfo.password) {
    new_script = new_script.replace(/PASSWORD/gi, mailInfo.password);
  }

  let mail_subject = "";

  if (mailInfo.type === "welcome") {
    mail_subject = `🍻오늘의술 ${mailInfo.nickname}님, 환영합니다!`;
  } else if (
    mailInfo.type === "beerfeedback" ||
    mailInfo.type == "complaintfeedback"
  ) {
    mail_subject = `🍻오늘의술 ${mailInfo.nickname}님, 건의 내용에 대한 답변입니다.`;
  } else if (mailInfo.type == "resetpassword") {
    mail_subject = `🍻오늘의술 ${mailInfo.nickname}님, 재발급된 비밀번호입니다.`;
  } else {
    mail_subject = `🍻오늘의술 ${mailInfo.nickname}님, 건의사항이 접수되었습니다.`;
  }

  // 메일 옵션
  const mailOptions: IMailOption = {
    from: "admin@ohsool.com",
    to: mailInfo.toEmail,
    subject: mail_subject,
    html: new_script,
  };

  // 메일 발송
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("email sent successfully");
    }
  });
};
