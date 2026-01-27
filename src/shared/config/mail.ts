import nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';
import * as dotenv from "dotenv"

dotenv.config()

export const mailTransporter: Transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false, 
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});