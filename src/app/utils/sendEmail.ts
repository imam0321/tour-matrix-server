/* eslint-disable @typescript-eslint/no-explicit-any */
import nodemailer from "nodemailer";
import { envVars } from "../config/env";

const transporter = nodemailer.createTransport({
  host: envVars.EMAIL_SENDER.SMTP_HOST,
  port: Number(envVars.EMAIL_SENDER.SMTP_POST),
  secure: true,
  auth: {
    user: envVars.EMAIL_SENDER.SMTP_USER,
    pass: envVars.EMAIL_SENDER.SMTP_PASS
  },

});

interface SendEmailOptions {
  to: string,
  subject: string,
  template: string,
  templateData? : Record<string, any>,
  attachments? : {
    filename: string,
    content: Buffer | string,
    contentType: string
  }[]
}

const sendEmail = async (
 { to,
  subject,
  template,
  templateData,
  attachments}: SendEmailOptions
)=> {
  const info = await transporter.sendMail({
    from: envVars.EMAIL_SENDER.SMTP_FROM,
    to: to,
    subject: subject,
    html: template,
    attachments: attachments?.map(attachment => ({
      filename: attachment.filename,
      content: attachment.content,
      contentType: attachment.contentType
    }))
  })
}