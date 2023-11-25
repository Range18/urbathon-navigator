export namespace AllExceptions {
  export enum AuthExceptions {
    AccountIsNotVerified = 'Account is not verified. Please verify your email.',
    WrongPassword = 'Wrong password',
    AccessToken = 'Access token expired',
    InvalidAccessToken = 'Invalid access token',

    Forbidden = ' Forbidden',

    InvalidVerify = 'Verify link is not found',
  }

  export enum FileExceptions {
    FileNotFound = 'Files are not found',
  }

  export enum NewsExceptions {
    NewsNotFound = 'News are not found',
  }

  export enum SessionExceptions {
    SessionNotFound = 'Session not found',
    SessionExpired = 'Session expired',
  }

  export enum UserExceptions {
    UserNotFound = 'User not found',
    UserAlreadyExists = 'User already exists',
  }
}
