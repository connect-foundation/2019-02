import * as gm from 'gm';
import * as fs from 'fs';
import { promisify } from 'util';
import { GmOptimizeOptions, SlideInfo } from '../../@types/converter';
import { fixRatio } from './utils';

const optimizeOptions: GmOptimizeOptions = {
  quality: 100,
  resolution: 144,
  compression: 'JPEG2000',
};

const DEFAULT_IMAGE_RATIO = 1.77777;

class SimpleGm {
  static createAndSelect(inputPath: string, outputPath: string, page: number) {
    const sgm = new SimpleGm(inputPath, outputPath);

    sgm.selectPage(page);

    return sgm;
  }

  static async getPdfPages(inputPath: string): Promise<number[]> {
    const readStream: fs.ReadStream = fs.createReadStream(inputPath);
    const pdf: gm.State = gm(readStream);
    const identify = promisify<string, string>(pdf.identify.bind(pdf));
    const pageStr: string = await identify('%p ');
    const pageStrArr: string[] = pageStr.split(/\s+/);
    const pages: number[] = pageStrArr.map((str) => +str)
      .filter((page) => !Number.isNaN(page));

    return pages;
  }

  private inputPath: string;
  private outputPath: string;
  private readStream: fs.ReadStream;
  private state: gm.State;
  private page: number;


  constructor(inputPath: string, outputPath: string) {
    this.inputPath = inputPath;
    this.outputPath = outputPath;
    this.readStream = null;
    this.state = null;
    this.page = 0;
  }

  async getRatio(): Promise<number> {
    this.reset();

    const size: any = await promisify(this.state.size.bind(this.state))();
    const ratio: number = size.width / size.height;

    return ratio;
  }

  async write(): Promise<SlideInfo> {
    const stream: fs.WriteStream = fs.createWriteStream(this.outputPath);
    const outputPath: string = <string>stream.path;
    const ratio: number = fixRatio(await this.getRatio()) || DEFAULT_IMAGE_RATIO;
    const slideInfo: SlideInfo = {
      path: outputPath,
      ratio,
      page: this.page,
    };

    return new Promise((resolve) => {
      stream.once('close', () => resolve(slideInfo));
      this.reset().optimize();
      this.state.stream('jpeg').pipe(stream);
    });
  }

  selectPage(page: number): SimpleGm {
    this.page = page;

    return this;
  }

  reset(): SimpleGm {
    this.readStream = fs.createReadStream(this.inputPath);
    this.state = gm(this.readStream, `${this.readStream.path}[${this.page - 1}]`);

    return this;
  }

  optimize(): SimpleGm {
    const {
      quality,
      resolution,
      compression,
    } = optimizeOptions;

    this.state = this.state
      .density(resolution, resolution)
      .quality(quality)
      .compress(compression);

    return this;
  }
}

export default SimpleGm;
