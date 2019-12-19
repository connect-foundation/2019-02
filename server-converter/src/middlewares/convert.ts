import { RequestHandler } from '../@types';
import { noitfyProgress } from './progress';
import { PROGRESS_CONVERTING, CONVERT_TIMEOUT } from '../constants';
import PdfConverter from '../core/Converter/PdfConverter';

const { EVENTS } = PdfConverter;
const convertMiddleware: RequestHandler = (req:any, res, next) => {
  res.setTimeout(CONVERT_TIMEOUT, () => { res.emit('close'); });
  req.stage = { stage: 'convert', next: false };
  const { channelId } = req.params;
  const convertDone = (slides) => {
    req.slides = slides;
    req.slideRatioList = slides.map((slide) => slide.ratio);
    res.emit('complete');
    next();
  };
  const convertStopped = () => {
    res.end();
  };
  const { converter } = req;

  converter.init().then(() => {
    converter.engine.on(EVENTS.PROGRESS, ({ page, length }) => noitfyProgress(channelId, {
      status: 'convert',
      message: `${PROGRESS_CONVERTING}: ${page}/${length} 완료`,
    }));
    converter.engine.on(EVENTS.DONE, convertDone);
    converter.engine.on(EVENTS.STOP, convertStopped);
    converter.convert();
  });
};

export default convertMiddleware;
