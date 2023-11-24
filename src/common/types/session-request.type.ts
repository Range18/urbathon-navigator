import { SessionEntity } from '../../core/session/session.entity';

export type SessionInRequest = Pick<SessionEntity, 'sessionId' | 'expireAt'>;
