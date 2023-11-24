import { uid } from 'uid';
import { storageConfig } from '../../common/configs/storage.config';
import { extname } from 'path';
import { Request } from 'express';

export function generateFilename(
  req: Request,
  file: Express.Multer.File,
  callback: (error: Error | null, filename: string) => void,
): void {
  callback(
    null,
    `${uid(storageConfig.nameLength)}${extname(file.originalname)}`,
  );
}

export function fileFilter(
  req: any,
  file: {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    destination: string;
    filename: string;
    path: string;
    buffer: Buffer;
  },
  callback: (error: Error | null, acceptFile: boolean) => void,
) {
  if (!storageConfig.allowedMimetypes.includes(file.mimetype)) {
    callback(new Error('File type is forbidden'), false);
  }
  //todo max size
}
