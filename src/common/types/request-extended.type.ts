import { Request } from 'express';
import { UserInRequest } from './user-request.type';
import { SessionInRequest } from './session-request.type';

export type RequestExtended = Request & {
  user?: UserInRequest;
  session?: SessionInRequest;
};
