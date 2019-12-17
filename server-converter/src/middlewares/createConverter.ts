import * as path from 'path';
import { Converter } from '../core';
import handleResponse from './stop';
import { RequestHandler, OutputNaming } from '../@types';

const creaveConverter: RequestHandler = (req:any, res, next) => {
  const { channelId } = req.params;
  const naming: OutputNaming = (page: number) => `${channelId}_${page}`;
  const inputPath = req.file.path;
  const outputPath = path.resolve(__dirname, '../../tmpFiles');
  const converter = new Converter(inputPath, outputPath, naming);
  const response = handleResponse(req, res, next);

  req.converter = converter;
  response();
};

export default creaveConverter;
