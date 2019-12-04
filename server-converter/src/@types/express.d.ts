import { Request, Response, NextFunction } from 'express';
import { SlideInfo } from './converter';

declare global {
  namespace Express {
      interface Request {
          topic: string;
          slides: SlideInfo[];
          fileUrl: string;
          slideUrls: string[];
      }
  }
}

export type RequestHandler = (req: Request, res: Response, next: NextFunction) => any;
export type MulterHandler = (req: Request, file: Express.Multer.File, callback: any) => any;
