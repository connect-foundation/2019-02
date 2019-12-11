import * as gm from 'gm';
import { ReadStream, createReadStream } from 'fs';
import {
  getExtension,
} from '../utils/pathParser';
import {
  SlideConverterSpec,
  SlideImageOptions,
  SlideInfo,
  SubscribeProgressCallback,
} from '../@types/converter';

class SlideConverter implements SlideConverterSpec {
  private options: SlideImageOptions;
  private progressDoneCallback: SubscribeProgressCallback;
  private totalSlideCount: number;
  private slideCountCompleted: number;

  private static getSlidesCount(inputPath: string): Promise<number> {
    return new Promise((resolve, reject) => {
      gm(inputPath).identify('%p ', (err, data) => {
        if (err) reject(err);
        else resolve(data.split(' ').length);
      });
    });
  }

  constructor(options: SlideImageOptions) {
    this.options = options;
    this.progressDoneCallback = null;
    this.totalSlideCount = 0;
    this.slideCountCompleted = 0;
  }

  async convertToSlides(inputPath: string, outputPath: string): Promise<SlideInfo[]> {
    const ext = getExtension(inputPath);

    if (ext === 'pdf') {
      const slides = await this.convertPdfToSlides(inputPath, outputPath);

      return slides;
    }

    return [];
  }

  subscribeProgress(callback) {
    this.progressDoneCallback = callback;
  }

  unsubscribeProgress() {
    this.progressDoneCallback = null;
  }

  private async convertPdfToSlides(inputPath: string, outputPath: string): Promise<SlideInfo[]> {
    const count = await SlideConverter.getSlidesCount(inputPath);
    const slideInfos = [];
    const pageArr = [];

    for (let page = 1; page <= count; page += 1) pageArr.push(page);
    this.totalSlideCount = count;

    await pageArr.reduce((chain, page) => {
      const nextChain = chain.then(async () => {
        const readStream = createReadStream(inputPath);
        const slideInfo = await this.writeSlide(readStream, outputPath, page);

        slideInfos.push(slideInfo);
      });

      return nextChain;
    }, Promise.resolve(null));

    return slideInfos;
  }

  private writeSlide(
    imageStream: ReadStream,
    outputPath: string,
    page: number,
  ): Promise<SlideInfo> {
    const { name, format } = this.options;
    const output = `${outputPath}/${name(page)}.${format}`;
    const slideInfoPromise: Promise<SlideInfo> = new Promise((resolve, reject) => {
      let slideRatio = 0;

      this.doGraphicWork(imageStream, page)
        .size((err, size) => {
          if (err) reject(err);
          slideRatio = size.width / size.height;
        })
        .write(output, (err) => {
          if (err) reject(err);
          else {
            this.progressDone();

            resolve({
              path: output,
              page,
              ratio: slideRatio,
            });
          }
        });
    });

    return slideInfoPromise;
  }

  private doGraphicWork(imageStream: ReadStream, page: number) {
    const {
      quality,
      resolution,
      compression,
    } = this.options;

    return gm(imageStream, `${imageStream.path}[${page - 1}]`)
      .density(resolution, resolution)
      .quality(quality)
      .compress(compression);
  }

  private progressDone() {
    this.slideCountCompleted += 1;
    this.progressDoneCallback(this.slideCountCompleted, this.totalSlideCount);
  }
}

export default SlideConverter;
