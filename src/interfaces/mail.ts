export interface IMailInfo {
    toEmail: string,
    nickname: string,
    type: string,
    beer?: string,
    beerId?: string,
}

export interface IMailOption {
    from: string,
    to: string,
    subject: string,
    html: string
}