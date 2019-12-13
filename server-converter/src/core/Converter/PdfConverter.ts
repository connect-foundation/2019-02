import * as Path from 'path';
import * as EventEmitter from 'events';
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
  private pageLength: number;

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
    this.pageLength = 0;
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
    const slideInfos: SlideInfo[] = [];
    const handleConvertFinished = (slideInfo: SlideInfo) => {
      const { page } = slideInfo;

      slideInfos.push(slideInfo);
      this.emit('progress', { page, length: this.pageLength });
    };

    try {
      this.sgms.forEach((sgm) => sgm.resetStream());
      await this.sgms.reduce((chain, sgm) => (
        chain.then(() => sgm.optimize().write().then(handleConvertFinished))
      ), Promise.resolve(null));
      this.removeAllListeners('progress');

      return slideInfos;
    } catch (err) {
      this.removeAllListeners('progress');
      throw err;
    }
  }

  getPageLength() {
    return this.pageLength;
  }
}

export default PdfConverter;
