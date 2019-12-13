import * as EventEmitter from 'events';

export type SubscribeProgressCallback = (page: number, totalPage: number) => void;
export type OutputNaming = (page: number) => string;

export interface ConverterEngine extends EventEmitter {
  init: () => Promise<void>,
  convert: () => Promise<SlideInfo[]>
  stop: () => Promise<void>
  clearOutput: () => Promise<void>
}

export interface GmOptimizeOptions {
  quality: number;
  resolution: number;
  compression: string;
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
