export interface IMailInfo {
  toEmail: string;
  nickname: string;
  type: string;
  beer?: string;
  beerId?: string;
  feedback?: string;
  complaint_title?: string;
  complaint_description?: string;
  password?: string;
}

export interface IMailOption {
  from: string;
  to: string;
  subject: string;
  html: string;
}
