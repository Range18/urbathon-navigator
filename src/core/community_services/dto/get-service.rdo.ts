import { NewsEntity } from '../../news/entities/news.entity';
import { postType } from '../types/post.type';

export class GetServiceProfileRdo {
  readonly id: string;

  readonly name: string;

  readonly type: postType;

  readonly description?: string;

  readonly news?: NewsEntity[];
}

export class GetServiceRdo {
  readonly id: string;

  readonly name: string;

  readonly type: postType;
  readonly description?: string;
}
