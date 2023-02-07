import { MailerService } from '@nestjs-modules/mailer';
import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Queue } from 'bull';

import Group from 'src/groups/group.entity';
import User from 'src/users/user.entiity';

@Injectable()
export class MailService {
  baseUrl: string;
  constructor(
    @InjectQueue('mailing') private readonly mailingQueue: Queue,
    private mailerService: MailerService,
    private configService: ConfigService,
  ) {}

  async sendUserConfirmation(email: string, url: string) {
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Welcome to Secret Santa',
        template: './confirmation',
        context: { email, url },
      });
    } catch (error) {
      console.log('Email failed', error);
    }
  }

  async queueInvitationMail(invitee: User, createdBy: User, group: Group) {
    const url = `${this.configService.get('FRONTENT_APP_BASEURL')}?id=${
      invitee.id
    }&group=${group.id}`;
    const { firstName, email, lastName } = createdBy;
    try {
      await this.mailingQueue.add('mailing', {
        invitee: invitee.email,
        createdBy: firstName || lastName ? `${firstName} ${lastName}` : email,
        group: group.title,
        url,
      });
    } catch (error) {
      console.log('Error queueing invite', error);
    }
  }

  async sendGroupInvitation(
    invitee: string,
    createdBy: string,
    group: string,
    url: string,
  ) {
    try {
      await this.mailerService.sendMail({
        to: invitee,
        subject: 'Welcome to Secret Santa',
        template: './invite',
        context: { invitee, createdBy, group, url },
      });
    } catch (error) {
      console.log('Invitation Email failed', error);
    }
  }
}
