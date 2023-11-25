import { Exclude } from 'class-transformer';

export class LoggedUserRdo {
  @Exclude()
  readonly refreshToken: string;

  readonly accessToken: string;

  @Exclude()
  readonly sessionExpireAt: Date;

  readonly uuid: string;

  constructor(
    refreshToken: string,
    accessToken: string,
    sessionExpireAt: Date,
    email: string,
  ) {
    this.refreshToken = refreshToken;
    this.accessToken = accessToken;
    this.sessionExpireAt = sessionExpireAt;
    this.uuid = email;
  }
}
