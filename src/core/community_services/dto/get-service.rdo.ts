import { NewsEntity } from '../../news/entities/news.entity';

export class GetServiceProfileRdo {
  readonly id: string;

  readonly name: string;

  readonly type: string; //Todo Typings

  readonly description?: string;

  readonly news?: NewsEntity[];
}

export class GetServiceRdo {
  readonly id: string;

  readonly name: string;

  readonly type: string; //Todo Typings

  readonly description?: string;
}
