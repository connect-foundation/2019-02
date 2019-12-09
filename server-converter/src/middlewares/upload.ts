import * as AwsSdk from 'aws-sdk';
import { createReadStream, existsSync } from 'fs';
import { RequestHandler } from '../@types';
import { noitfyProgress } from './progress';
import { PROGRESS_UPLOADING } from '../constants';

const s3 = new AwsSdk.S3({
  endpoint: process.env.NCS_ENDPOINT,
  accessKeyId: process.env.NCS_ACCESS_KEY,
  secretAccessKey: process.env.NCS_SECRET_KEY,
  region: process.env.NCS_REGION,
});

const uploadToObjectStorage = (
  filePath: string,
  channelId: string,
  name: string,
  isFile: boolean,
): Promise<string> => new Promise((resolve, reject) => {
  const readStream = createReadStream(filePath);
  const params = {
    Bucket: process.env.NCS_BUCKET,
    Key: `${channelId}/${isFile ? 'files' : 'slides'}/${name}`,
    ACL: 'public-read',
    Body: readStream,
    CacheControl: 'public, max-age=864000',
  };

  s3.upload(params, (err: any, data) => {
    readStream.destroy();
    if (err) reject(err);
    else resolve(data.Location);
  });
});

const uploadMiddleware: RequestHandler = (req:any, _, next) => {
  if (existsSync(req.file.path)) {
    const { channelId } = req.params;
    const uploadFile: Promise<string> = uploadToObjectStorage(
      req.file.path,
      channelId,
      'index',
      true,
    );
    const uploadSlides: Promise<string>[] = req.slides.map((slide) => uploadToObjectStorage(
      slide.path,
      channelId,
      `${slide.page}`,
      false,
    ));

    noitfyProgress(channelId, { message: PROGRESS_UPLOADING });
    Promise.all([uploadFile, ...uploadSlides])
      .then((locations) => {
        req.fileUrl = locations.shift();
        req.slideUrls = locations;
        next();
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
};

export default uploadMiddleware;
