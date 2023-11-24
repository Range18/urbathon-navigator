import {
  mailMessages,
  mailSubjects,
  MailType,
  SUPPORT_EMAIL_ADDRESS,
} from '../mail/mail.constants';

export class MailDto {
  mailType: MailType;
  recipient: string;
  subject: string;
  message: string;
  constructor(mailType: MailType, recipient: string, link: string) {
    this.mailType = mailType;
    this.recipient = recipient;

    switch (this.mailType) {
      case 'verify':
        this.subject = mailSubjects.verify;
        this.message = mailMessages.verify.createMessage(link);
        break;

      case 'passwordReset':
        this.subject = mailSubjects.passwordReset;
        this.message = mailMessages.passwordReset.createMessage(link);
        break;

      case 'PasswordResetSuccess':
        this.subject = mailSubjects.PasswordResetSuccess;
        this.message = mailMessages.PasswordResetSuccess.createMessage(
          SUPPORT_EMAIL_ADDRESS,
        );
        break;
    }
  }
}
