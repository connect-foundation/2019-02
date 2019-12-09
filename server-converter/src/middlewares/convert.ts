import * as path from 'path';
import { Converter } from '../core';
import { RequestHandler } from '../@types';
import { noitfyProgress } from './progress';
import { PROGRESS_CONVERTING } from '../constants';

const convertMiddleware: RequestHandler = (req: any, _, next) => {
  req.isConverted = true;
  const { channelId } = req.params;
  const converterOptions = {
    quality: 100,
    format: 'png',
    resolution: 144,
    compression: 'JPEG2000',
    name: (page: number) => `${channelId}_${page}`,
  };
  const converter = new Converter(converterOptions);
  const inputPath = req.file.path;
  const outputPath = path.resolve(__dirname, '../../tmpFiles');

  converter.subscribeProgress((page, totalPage) => noitfyProgress(channelId, {
    message: `${PROGRESS_CONVERTING}: ${page}/${totalPage} 완료`,
  }));
  converter.convertToSlides(inputPath, outputPath).then((slides) => {
    req.slides = slides;
    req.slideRatioList = slides.map((slide) => slide.ratio);
    converter.unsubscribeProgress();
    next();
  });
};

export default convertMiddleware;
