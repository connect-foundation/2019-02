import * as jwt from 'jsonwebtoken';
import { RequestHandler } from 'express';

const verifyToken = (token: string): boolean => {
  if (!token) return false;

  try {
    const payload: any = jwt.verify(token, process.env.TOKEN_SECRET);

    return !!(payload.id && payload.displayname);
  } catch (error) {
    return false;
  }
};

const authMiddleware: RequestHandler = (req, res, next) => {
  const tokenKey: string = 'x-auth-token';
  const token: string = req.headers[tokenKey] as string;
  const isVerified: boolean = verifyToken(token);

  if (isVerified) {
    next();
  } else {
    res.status(401).end();
  }
};

export default authMiddleware;
