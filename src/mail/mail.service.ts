import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  baseUrl: string;
  constructor(private mailerService: MailerService) { }

  async sendUserConfirmation(email: string, url: string) {
    try{
      await this.mailerService.sendMail({
        to: 'example@example.com',
        subject: 'Welcome to Secret Santa',
        template: './confirmation',
        context: { email, url },
      });
    } catch (error) {
      console.log('Email failed', error);
    }
  }
}
