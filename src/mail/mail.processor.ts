import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { MailService } from './mail.service';

@Processor('mailing')
export class MailingProcessor {
  constructor(private readonly mailService: MailService) {}

  private readonly logger = new Logger();

  @Process('mailing')
  async handleGroupInvite(job: Job) {
    const {
      data: { invitee, createdBy, group, url },
    } = job;
    this.logger.log('Invite mail queue process started', job.data);
    await this.mailService.sendGroupInvitation(invitee, createdBy, group, url);
    this.logger.log('Invite mail queue process ended', job.data);
  }
}
