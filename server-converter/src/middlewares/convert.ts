import * as path from 'path';
import { Converter } from '../core';
import { RequestHandler, OutputNaming } from '../@types';
import { noitfyProgress } from './progress';
import { PROGRESS_CONVERTING, CONVERT_TIMEOUT,  } from '../constants';

const convertMiddleware: RequestHandler = (req: any, res, next) => {
  res.setTimeout(CONVERT_TIMEOUT, () => {res.emit('close');});

  req.isConverted = true;
  const { channelId } = req.params;
  const naming: OutputNaming = (page: number) => `${channelId}_${page}`;
  const inputPath = req.file.path;
  const outputPath = path.resolve(__dirname, '../../tmpFiles');
  const converter = new Converter(inputPath, outputPath, naming);

  converter.init().then(() => {
    converter.engine.on('progress', ({ page, length }) => noitfyProgress(channelId, {
      message: `${PROGRESS_CONVERTING}: ${page}/${length} 완료`,
    }));
    converter.convert().then((slides) => {
      req.slides = slides;
      req.slideRatioList = slides.map((slide) => slide.ratio);
      next();
    });
  });
};

export default convertMiddleware;
