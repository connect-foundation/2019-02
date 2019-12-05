export type SubscribeProgressCallback = (page: number, totalPage: number) => void;

export interface SlideConverterSpec {
  convertToSlides: (inputPath: string, outputPath: string) => Promise<SlideInfo[]>;
  subscribeProgress: (callback: SubscribeProgressCallback) => void;
  unsubscribeProgress: () => void;
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
  ratio: number;
}
