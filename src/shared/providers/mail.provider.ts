import { Transporter } from 'nodemailer';
import { MailProviderPort } from './interface/mail.provider.port';
import { mailTransporter } from '@shared/config/mail';
import * as dotenv from 'dotenv';
import { mailgunClient } from '@shared/utils/mailgun.client';

dotenv.config();


export class MailProvider implements MailProviderPort {
  private readonly domain = process.env.MAILGUN_DOMAIN!;
  private readonly from = process.env.MAILGUN_FROM!;

  async send(to: string | string[], subject: string, html: string): Promise<void> {
    const mensage = await mailgunClient.messages.create(this.domain, {
      from: this.from,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
    });

  }
} 