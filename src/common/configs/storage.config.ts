import { get } from 'env-var';
import { resolve } from 'path';
import * as process from 'process';

export const storageConfig = {
  path: resolve(process.cwd(), get('STORAGE_PATH').required().asString()),
  //todo maxSize: get('MAX_SIZE').required().asIntPositive(),
  nameLength: get('FILENAME_LENGTH').default(10).asIntPositive(),
  defaultAvatar: get('DEFAULT_AVATAR').required().asString(),
  defaultMimetype: 'image/png',
  allowedMimetypes: ['image/jpeg', 'image/png', 'image/gif'],
  allowedFiles: {
    png: '89504E470D0A1A0A',
    jpeg: 'FFD8',
    gif: '47494638',
  },
};
