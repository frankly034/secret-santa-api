import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { MailService } from './mail.service';

@Module({
  imports:[MailerModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
      transport: {
        host: configService.get('MAIL_HOST'),
        secure: false,
        auth: {
          user: configService.get('MAIL_USER'),
          pass: configService.get('MAIL_PASSWORD'),
        }
      },
      defaults: {
        from: `"No reply" <${configService.get('MAIL_SENDER')}>`
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        }
      }
    })
  })],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
