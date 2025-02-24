import * as Path from 'path';
import * as EventEmitter from 'events';
import * as fs from 'fs';
import { promisify } from 'util';
import {
  ConverterEngine,
  OutputNaming,
  SlideInfo,
} from '../../@types/converter';
import SimpleGm from './SimpleGm';

class PdfConverter extends EventEmitter implements ConverterEngine {
  private inputPath: string;
  private outputPath: string;
  private outputNaming: OutputNaming;
  private sgms: SimpleGm[];
  private slides: SlideInfo[];
  private pageLength: number;
  private done: boolean;
  private convertChain: Promise<SlideInfo[]>;

  constructor(
    inputPath: string,
    outputPath: string,
    outputNaming: OutputNaming,
  ) {
    super();
    this.inputPath = inputPath;
    this.outputPath = outputPath;
    this.outputNaming = outputNaming;
    this.sgms = [];
    this.slides = [];
    this.pageLength = 0;
    this.done = false;
    this.convertChain = null;
  }

  async init(): Promise<void> {
    const pages: number[] = await SimpleGm.getPdfPages(this.inputPath);

    this.pageLength = pages.length;
    this.sgms = pages.map((page) => {
      const fileName: string = `${this.outputNaming(page)}.jpg`;
      const outputPath: string = Path.join(this.outputPath, fileName);
      const sgm: SimpleGm = SimpleGm.createAndSelect(this.inputPath, outputPath, page);

      return sgm;
    });
  }

  async convert(): Promise<SlideInfo[]> {
    const convertDone = (slide: SlideInfo) => {
      this.slides.push(slide);
      this.emit('progress', { page: slide.page, length: this.pageLength });
    };
    const convertStopped = () => {
      if (this.done) throw new Error('all convert done');
    };
    const convertEnd = () => {
      this.end();
      return this.slides;
    };

    this.convertChain = this.sgms.reduce(
      (chain, sgm) => chain
        .then(convertStopped)
        .then(() => sgm.write().then(convertDone)),
      Promise.resolve(null),
    )
      .then(convertEnd)
      .catch(convertEnd);

    const slides: SlideInfo[] = await this.convertChain;

    return slides;
  }

  end(): void {
    this.removeAllListeners('progress');
    this.done = true;
  }

  async stop(clear): Promise<void> {
    this.end();
    await this.convertChain;
    if (clear) {
      await this.clearOutput();
    }
  }

  async clear(): Promise<void> {
    await this.convertChain;
    this.clearInput();
    this.clearOutput();
  }

  async clearInput(): Promise<void> {
    const removeFile = promisify(fs.unlink.bind(fs));

    await removeFile(this.inputPath);
  }

  async clearOutput(): Promise<void> {
    const removeFile = promisify(fs.unlink.bind(fs));
    const removeAllOutput = this.slides.map(({ path }) => removeFile(path));

    await Promise.all(removeAllOutput);
  }

  getPageLength() {
    return this.pageLength;
  }
}

export default PdfConverter;
