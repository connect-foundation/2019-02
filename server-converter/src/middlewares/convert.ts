import * as path from 'path';
import Converter from '../core';
import { RequestHandler } from '../@types';

const convertMiddleware: RequestHandler = (req, _, next) => {
  const { channelId } = req.body;
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

  converter.convertToSlides(inputPath, outputPath).then((slides) => {
    req.slides = slides;
    next();
  });
};

export default convertMiddleware;
