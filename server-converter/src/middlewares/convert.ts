import * as path from 'path';
import { Converter } from '../core';
import { RequestHandler, OutputNaming } from '../@types';
import { noitfyProgress } from './progress';
import { PROGRESS_CONVERTING } from '../constants';

const convertMiddleware: RequestHandler = (req, _, next) => {
  req.isConverted = true;
  const { channelId } = req.params;
  const naming: OutputNaming = (page: number) => `${channelId}_${page}`;
  const inputPath = req.file.path;
  const outputPath = path.resolve(__dirname, '../../tmpFiles');
  const converter = new Converter(inputPath, outputPath, naming);
  const convertDone = (slides) => {
    req.slides = slides;
    req.slideRatioList = slides.map((slide) => slide.ratio);
    next();
  };

  req.converter = converter;
  converter.init().then(() => {
    converter.engine.on('progress', ({ page, length }) => noitfyProgress(channelId, {
      message: `${PROGRESS_CONVERTING}: ${page}/${length} 완료`,
    }));
    converter.convert().then(convertDone).catch((err) => next(err));
  });
};

export default convertMiddleware;
