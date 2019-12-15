import { Request, Response, NextFunction } from 'express';
import { SlideInfo } from './converter';
import Converter from '../core/Converter';

declare global {
  namespace Express {
      interface Request {
          topic: string;
          slides: SlideInfo[];
          fileUrl: string;
          slideUrls: string[];
          slideRatioList: number[]
          isConverted: boolean;
          converter: Converter;
          endflag: boolean;
          isSaved: boolean;
          isCanceled: boolean;
      }
  }
}

export type RequestHandler = (req: Request, res: Response, next: NextFunction) => any;
export type MulterHandler = (req: Request, file: Express.Multer.File, callback: any) => any;
