import { FileEntity } from '../../storage/entity/file.entity';
import { GetServiceRdo } from '../../community_services/dto/get-service.rdo';

export class GetNewsRdo {
  readonly uuid: string;
  readonly title: string;

  readonly text: string;

  readonly address: string;

  readonly preview: FileEntity;

  readonly service: GetServiceRdo;

  constructor(
    uuid: string,
    title: string,
    text: string,
    address: string,
    preview: FileEntity,
    service: GetServiceRdo,
  ) {
    this.uuid = uuid;
    this.title = title;
    this.text = text;
    this.address = address;
    this.preview = preview;
    this.service = service;
  }
}
