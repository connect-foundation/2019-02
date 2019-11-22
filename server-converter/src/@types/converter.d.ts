export interface SlideConverterSpec {
  convertToSlides: (inputPath: string, outputPath: string) => Promise<SlideInfo[]>
}

export interface SlideImageOptions {
  quality: number;
  format: string;
  resolution: number;
  compression: string;
  width?: number;
  height?: number;
  name: (page: number) => string;
}

export interface SlideInfo {
  path: string;
  page: number;
}
