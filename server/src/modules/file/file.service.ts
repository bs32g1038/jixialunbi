import * as path from 'path';
import * as multr from 'multer';
import { Injectable, BadRequestException } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { md5 } from '../../utils/crypto.util';
import { creteUploadFile } from '../../utils/upload.util';

MulterModule.register({
  storage: multr.memoryStorage(),
});

enum FileType {
  image = 'image',
  video = 'video',
  audio = 'audio',
  document = 'document',
  other = 'other',
}

@Injectable()
export class FileService {
  FILE_TYPE_MAP_MIMETYPE = [
    {
      type: FileType.video,
      mimetypes: ['mp4', 'x-flv'],
    },
    {
      type: FileType.audio,
      mimetypes: ['mpeg', 'mp3'],
    },
    {
      type: FileType.image,
      mimetypes: ['png', 'jpg', 'jpeg', 'webp'],
    },
    {
      type: FileType.document,
      mimetypes: ['txt', 'doc', 'docx', 'pdf'],
    },
    {
      type: FileType.other,
      mimetypes: [],
    },
  ];

  public async uploadFile(file) {
    const mimetype = file.mimetype;
    const size = file.size;
    const name = md5(file.buffer);

    const suffix = path.extname(file.originalname);
    const fileName = name + suffix;

    let type = FileType.other;
    for (const item of this.FILE_TYPE_MAP_MIMETYPE) {
      const rs = item.mimetypes.some((t) => {
        return mimetype.toLocaleLowerCase().includes(t);
      });
      if (rs) {
        if (item.type === FileType.image && Number(size) > 1024 * 1024 * 1) {
          throw new BadRequestException('图片最大为 2MB');
        }
        type = item.type;
        break;
      }
    }

    // 文件处理
    const p = await creteUploadFile(fileName, file.buffer);
    return { url: p };
  }
}
