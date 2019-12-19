import * as Path from 'path';
import * as EventEmitter from 'events';
import * as fs from 'fs';
import { promisify } from 'util';
import {
  ConverterEngine,
  OutputNaming,
  SlideInfo,
} from '../../@types/converter';
import SimpleGm, { DEFAULT_IMAGE_RATIO } from './SimpleGm';

/**
 * Hotfix: callback 방식의 IO 작업을 중단점을 두고 순차적으로 실행시키기 위한 Generator 함수
 * - 추후 리팩토링 예정
 * - Promise 활용시 이슈 있음 (queue 의 동작과 연관 있는듯 추정)
 */
const CONVERT_STOPPED = 'CONVERT_STOPPED';

interface Iterator<T> {
  next(value?: boolean): IteratorResult<T>;
  return?(value?: void): IteratorResult<T>;
  throw?(e?: any): IteratorResult<T>;
}

function* getConvertIterator(
  sgms: SimpleGm[],
  convertDone: Function,
  convertEnd: Function,
): Iterator<void> {
  const imageConverters: SimpleGm[] = [...sgms];
  let stopped: boolean = false;

  while (imageConverters.length > 0) {
    if (stopped) throw new Error(CONVERT_STOPPED);
    stopped = yield imageConverters.shift().write(convertDone);
  }
  convertEnd();
}

class PdfConverter extends EventEmitter implements ConverterEngine {
  /**
   * Hotfix: 가끔 첫 페이지의 ratio 가 gm.js 모듈로부터 NaN으로 넘어온다.
   * 이를 다른 슬라이드값으로 넣어준다.
   */
  static fixRatios(slides: SlideInfo[]): SlideInfo[] {
    let generalRatio = DEFAULT_IMAGE_RATIO;

    for (let i = 0; i < slides.length; i += 1) {
      if (!Number.isNaN(slides[i].ratio)) {
        generalRatio = slides[i].ratio;
        break;
      }
    }

    return slides.map(({ path, ratio, page }) => ({
      path,
      page,
      ratio: Number.isNaN(ratio) ? generalRatio : ratio,
    }));
  }

  /**
   * Event object
   */
  static EVENTS = {
    DONE: 'done',
    STOP: 'stop',
    PROGRESS: 'progress',
  };

  private inputPath: string;
  private outputPath: string;
  private outputNaming: OutputNaming;
  private sgms: SimpleGm[];
  private slides: SlideInfo[];
  private pageLength: number;
  private done: boolean;

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

  convert(): void {
    const self: PdfConverter = this;
    const convertIterator: Iterator<void> = getConvertIterator(this.sgms, convertDone, convertEnd);
    let done: boolean = false;

    convertIterator.next();

    function convertDone(slide: SlideInfo) {
      self.slides.push(slide);
      self.emit(PdfConverter.EVENTS.PROGRESS, { page: slide.page, length: self.pageLength });

      try {
        if (!done) ({ done } = convertIterator.next(self.done));
      } catch (err) {
        if (err === CONVERT_STOPPED) convertStopped();
        else throw err;
      }
    }
    function convertEnd() {
      self.emit(PdfConverter.EVENTS.DONE, PdfConverter.fixRatios(self.slides));
      self.end();
    }
    function convertStopped() {
      self.emit(PdfConverter.EVENTS.STOP, PdfConverter.fixRatios(self.slides));
      self.end();
    }
  }

  end(): void {
    this.removeAllListeners(PdfConverter.EVENTS.PROGRESS);
    this.removeAllListeners(PdfConverter.EVENTS.DONE);
    this.removeAllListeners(PdfConverter.EVENTS.STOP);
    this.done = true;
  }

  stop(clear: boolean): void {
    this.done = true;
    if (clear) {
      this.on(PdfConverter.EVENTS.STOP, () => this.clearOutput());
    }
  }

  async clear(): Promise<void> {
    await this.clearInput();
    await this.clearOutput();
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
