import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { join, resolve } from 'path';
import { env } from 'src/env';
import { User } from 'src/types';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private config: ConfigService,
  ) {}
  async sendOPT(user: User, src: { token: string; id: number; role: string }) {
    const url = `${env.SERVER_DOMAIN}/user/activate/?token=${src.token}&id=${src.id}&role=${src.role}`;

    try {
      await this.mailerService.sendMail({
        to: user.email,
        // from: '"Support Team" <support@example.com>', // override default from
        subject: 'Welcome to Nice App! Confirm your Email',
        template: './OPT', // `.hbs` extension is appended automatically
        context: {
          // ✏️ filling curly brackets with content
          name: user.name,
          url,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
