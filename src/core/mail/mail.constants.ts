import { smtpConfig } from '../../common/configs/smtp.config';
import { Address } from 'nodemailer/lib/mailer';

export type MailType = 'verify' | 'passwordReset' | 'PasswordResetSuccess';

type MailSubjects = {
  [key in MailType]: string;
};

type MailMessages = {
  [key in MailType]: { createMessage(link: string | Address): string };
};
export const SUPPORT_EMAIL_ADDRESS = smtpConfig.from!;
export const mailSubjects: Readonly<MailSubjects> = {
  verify: 'Подтвердите свой аккаунт',
  passwordReset: 'Password reset email',
  PasswordResetSuccess: 'Password changed successfully',
};

export const mailMessages: Readonly<MailMessages> = {
  verify: {
    createMessage(link: string) {
      return `
           <div>
              <h1>Перейдите по этой ссылке, чтобы подтвердить почту</h1>
              <a href='${link}'>Активировать аккаунт</a>
           </div>       
            `;
    },
  },
  passwordReset: {
    createMessage(link: string) {
      return `
           <div>
                <h1>Follow this link to reset your password</h1>
                <a href='${link}'>Reset password</a>
           </div>
            `;
    },
  },
  PasswordResetSuccess: {
    createMessage(link: string) {
      return `
           <div>
              <h1>Your password succesfully changed</h1>
              <div>If it was not you, you must tell that to out oficial support</div>
              <a href='${link}'>Our support</a>
           </div>
            `;
    },
  },
};
