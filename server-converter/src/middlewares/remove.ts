import { unlink } from 'fs';
import { RequestHandler } from '../@types';
import { getPdfFilePath } from '../utils/pathParser';

const removeMiddleware: RequestHandler = (req:any, res, next) => {
  const filePath = req.file ? req.file.path : getPdfFilePath(req.params.channelId);
  const slides = req.slides ? req.slides.map((slide) => slide.path) : [];
  const removeTmpFiles: Promise<void>[] = [
    filePath,
    ...slides,
  ].map((path: string) => new Promise((resolve, reject) => {
    unlink(path, (err) => {
      if (err) reject();
      else resolve();
    });
  }));

  Promise.all(removeTmpFiles)
    .then(() => { next(); })
    .catch((err) => { throw err; });
};

export default removeMiddleware;
