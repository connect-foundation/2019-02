import { RequestHandler } from '../@types';
import { noitfyProgress } from './progress';
import { PROGRESS_CONVERTING, CONVERT_TIMEOUT } from '../constants';

const convertMiddleware: RequestHandler = (req:any, res, next) => {
  res.setTimeout(CONVERT_TIMEOUT, () => { res.emit('close'); });
  req.stage = { stage: 'convert', next: false };
  const { channelId } = req.params;
  const convertDone = (slides) => {
    req.slides = slides;
    req.slideRatioList = slides.map((slide) => slide.ratio);
    if (!req.isStop) { res.emit('complete'); next(); }
  };
  const { converter } = req;

  converter.init().then(() => {
    converter.engine.on('progress', ({ page, length }) => noitfyProgress(channelId, {
      status: 'convert',
      message: `${PROGRESS_CONVERTING}: ${page}/${length} 완료`,
    }));
    converter.convert().then(convertDone).catch((err) => {
      next(err);
    });
  });
};

export default convertMiddleware;
