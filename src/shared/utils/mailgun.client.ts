import FormData from 'form-data';
import Mailgun from 'mailgun.js';

import * as dotenv from 'dotenv';
dotenv.config();

export const mailgunClient = new Mailgun(FormData).client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY!,
});