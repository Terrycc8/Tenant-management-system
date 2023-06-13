import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Part } from 'formidable';

import { mkdirSync } from 'fs';
import { IncomingMessage } from 'http';
import * as formidable from 'formidable';

const uploadDir = '/upload';
@Injectable()
export class UploadService {
  async imageUpload(req: IncomingMessage) {
    mkdirSync(uploadDir, { recursive: true });

    const form = new formidable.Formidable({
      multiples: true,
      maxFiles: 20,
      uploadDir,
      keepExtensions: true,
      filename: (name: string, ext: string, part: Part) => {
        return randomUUID() + '.' + part.mimetype?.split('/').pop();
      },
      filter: ({ mimetype, name }) => {
        return (
          (mimetype && mimetype.startsWith('image') && name === 'image') ||
          false
        );
      },
    });

    let files = await new Promise((resolve, reject) => {
      console.log('parse', req.headers['content-type']);
      form.parse(req, (err, field, files) => {
        console.log('formidable', { err, files });
        if (err) {
          reject(err);
          return;
        }
        resolve({ field, files });
      });
    });

    return files;
  }
}
