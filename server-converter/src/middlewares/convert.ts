import { RequestHandler } from '../@types';
import { noitfyProgress } from './progress';
import handleResponse from './stop';
import { PROGRESS_CONVERTING, CONVERT_TIMEOUT } from '../constants';

const convertMiddleware: RequestHandler = (req, res, next) => {
  res.setTimeout(CONVERT_TIMEOUT, () => { res.emit('close'); });
  req.stage = { stage: 'convert', next: false };
  const { channelId } = req.params;
  const response = handleResponse(req, res, next);
  const convertDone = (slides) => {
    req.slides = slides;
    req.slideRatioList = slides.map((slide) => slide.ratio);
    response();
  };
  const { converter } = req;

  converter.init().then(() => {
    converter.engine.on('progress', ({ page, length }) => noitfyProgress(channelId, {
      status: 'convert',
      message: `${PROGRESS_CONVERTING}: ${page}/${length} 완료`,
    }));
    converter.convert().then(convertDone).catch((err) => {
      response(err);
    });
  });
};

export default convertMiddleware;
