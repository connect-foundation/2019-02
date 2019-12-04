import * as gm from 'gm';
import { ReadStream, createReadStream } from 'fs';
import {
  getExtension,
} from '../utils/pathParser';
import {
  SlideConverterSpec,
  SlideImageOptions,
  SlideInfo,
} from '../@types/converter';

class SlideConverter implements SlideConverterSpec {
  private options: SlideImageOptions;

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
  }

  async convertToSlides(inputPath: string, outputPath: string): Promise<SlideInfo[]> {
    const ext = getExtension(inputPath);

    if (ext === 'pdf') {
      const slides = await this.convertPdfToSlides(inputPath, outputPath);

      return slides;
    }

    return [];
  }

  private async convertPdfToSlides(inputPath: string, outputPath: string): Promise<SlideInfo[]> {
    const count = await SlideConverter.getSlidesCount(inputPath);
    const promises = [];

    for (let page = 1; page <= count; page += 1) {
      const readStream = createReadStream(inputPath);
      const slideInfoPromise = this.writeSlide(readStream, outputPath, page);

      promises.push(slideInfoPromise);
    }

    const slideInfos = await Promise.all(promises);

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
}

export default SlideConverter;
