import { unlink } from 'fs';
import { RequestHandler } from '../@types';

const removeMiddleware: RequestHandler = (req, _, next) => {
  const removeTmpFiles: Promise<void>[] = [
    req.file.path,
    ...req.slides.map((slide) => slide.path),
  ].map((path: string) => new Promise((resolve, reject) => {
    unlink(path, (err) => {
      if (err) reject();
      else resolve();
    });
  }));

  Promise.all(removeTmpFiles)
    .then(() => next())
    .catch((err) => { throw err; });
};

export default removeMiddleware;
