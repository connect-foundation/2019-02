import { getExtension } from '../../utils/pathParser';
import {
  ConverterEngine,
  SlideInfo,
  OutputNaming,
} from '../../@types/converter';
import PdfConverter from './PdfConverter';

class Converter {
  private inputPath: string;
  private outputPath: string;
  private outputNaming: OutputNaming;
  public engine: ConverterEngine;

  constructor(
    inputPath: string,
    outputPath: string,
    outputNaming: OutputNaming,
  ) {
    this.inputPath = inputPath;
    this.outputPath = outputPath;
    this.outputNaming = outputNaming;
  }

  async init() {
    const fileExtension = getExtension(this.inputPath).toLowerCase();

    if (fileExtension === 'pdf') {
      this.engine = new PdfConverter(
        this.inputPath,
        this.outputPath,
        this.outputNaming,
      );
    }

    try {
      await this.engine.init();
    } catch (err) {
      this.logError(err);
    }
  }

  async convert(): Promise<SlideInfo[]> {
    try {
      const slideInfos: SlideInfo[] = await this.engine.convert();

      return slideInfos;
    } catch (err) {
      this.logError(err);
    }
  }

  private logError(err) {
    console.error(`[Converter Error] ${err.message}`);
  }
}

export default Converter;
