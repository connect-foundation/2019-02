import * as AwsSdk from 'aws-sdk';
import { createReadStream, read } from 'fs';
import { RequestHandler } from '../@types';

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
  };

  s3.upload(params, (err: any, data) => {
    readStream.destroy();
    if (err) reject(err);
    else resolve(data.Location);
  });
});

const uploadMiddleware: RequestHandler = (req, _, next) => {
  const { channelId } = req.body;
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

  Promise.all([uploadFile, ...uploadSlides])
    .then((locations) => {
      req.fileUrl = locations.shift();
      req.slideUrls = locations;
      next();
    })
    .catch((err) => {
      throw new Error(err);
    });
};

export default uploadMiddleware;
