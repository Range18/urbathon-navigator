import { BadRequestException, Injectable } from '@nestjs/common';
import { createTransport, Transporter } from 'nodemailer';
import { smtpConfig } from '../../common/configs/smtp.config';
import { frontendServer } from '../../common/configs/config';
import { MailDto } from './mail.dto';

@Injectable()
export class MailService {
  private readonly transporter: Transporter;

  constructor() {
    this.transporter = createTransport(smtpConfig);
  }

  private async sendEMail(mailDto: MailDto) {
    await this.transporter
      .sendMail({
        from: smtpConfig.from,
        to: mailDto.recipient,
        subject: mailDto.subject,
        text: '',
        html: mailDto.message,
      })
      .catch((err) => {
        throw new BadRequestException(err['code'], { cause: err['response'] });
      });
  }

  async sendVerifyEmail(recipient: string, link: string) {
    await this.sendEMail(new MailDto('verify', recipient, link));
  }

  async sendPassResetEmail(recipient: string, code: string) {
    await this.sendEMail(
      new MailDto(
        'passwordReset',
        recipient,
        `${frontendServer.url}/user/change/password/${code}`,
      ),
    );
  }
}
