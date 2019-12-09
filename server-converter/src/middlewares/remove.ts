import { unlink } from 'fs';
import { RequestHandler } from '../@types';

const removeMiddleware: RequestHandler = (req:any, res, next) => {
  // TODO: 1IP 일때, 큐에서 삭제된 프로세스 파일 삭제 필요
  const slides = req.slides ? req.slides.map((slide) => slide.path) : [];
  const removeTmpFiles: Promise<void>[] = [
    req.file.path,
    ...slides,
  ].map((path: string) => new Promise((resolve, reject) => {
    unlink(path, (err) => {
      if (err) reject();
      else resolve();
    });
  }));

  Promise.all(removeTmpFiles)
    .then(() => {
      if (req.endflag) {
        req.isCanceled = true;
        res.emit('end');
        res.status(204).end();
      } else next();
    })
    .catch((err) => { throw err; });
};

export default removeMiddleware;
