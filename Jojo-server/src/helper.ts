import { randomUUID } from 'crypto';
import { mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { uploadDir } from './types';
import { FilesInterceptor } from '@nestjs/platform-express';

export function filesInterceptorConfig(maxFiles: number) {
  return FilesInterceptor('image', maxFiles, {
    storage: diskStorage({
      destination: (req, file, cb) => {
        mkdirSync(uploadDir, { recursive: true });
        cb(null, uploadDir);
      },
      filename: (req, file, cb) => {
        let newFileName = randomUUID() + '.' + file.mimetype.split('/').pop();
        cb(null, newFileName);
      },
    }),
    fileFilter: (req, file, cb) => {
      if (!file.mimetype.startsWith('image')) {
        return cb(new Error('Only image files are allowed!'), false);
      }

      cb(null, true);
    },
    limits: { fileSize: 512 * 1024 },
  });
}
