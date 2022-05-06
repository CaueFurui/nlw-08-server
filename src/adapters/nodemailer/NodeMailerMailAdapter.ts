import { MailAdapter, SendMailData } from "../MailAdapter";
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER_CODE,
    pass: process.env.MAILTRAP_USER_PASS
  }
});

export class NodeMailerMailAdapter implements MailAdapter {

  async sendEmail({ body, subject }: SendMailData) {
    await transport.sendMail({ 
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Caue Furui <cauefurui@gmail.com>',
      subject,
      html: body
    })
  }
}