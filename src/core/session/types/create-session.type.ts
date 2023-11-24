import { TokenPayload } from './user.payload';

export type CreateSession = Pick<TokenPayload, 'userUUID'>;
