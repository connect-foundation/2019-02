import { RequestHandler } from '../@types';
import { noitfyProgress } from './progress';
import stop from './stop';
import { PROGRESS_CONVERTING, CONVERT_TIMEOUT } from '../constants';

const convertMiddleware: RequestHandler = (req, res, next) => {
  console.log('convert', req.params.channelId);
  res.setTimeout(CONVERT_TIMEOUT, () => { res.emit('close'); });

  const { channelId } = req.params;
  const stopConverter = stop({ req, res, next }, 'convert');
  const convertDone = (slides) => {
    req.slides = slides;
    req.slideRatioList = slides.map((slide) => slide.ratio);
    stopConverter();
  };
  const { converter } = req;
  converter.init().then(() => {
    converter.engine.on('progress', ({ page, length }) => noitfyProgress(channelId, {
      status: 'convert',
      message: `${PROGRESS_CONVERTING}: ${page}/${length} 완료`,
    }));
    converter.convert().then(convertDone).catch((err) => {
      stopConverter(err);
    });
  });
};

export default convertMiddleware;
