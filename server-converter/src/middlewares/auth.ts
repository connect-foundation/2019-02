import * as jwt from 'jsonwebtoken';
import { RequestHandler } from '../@types';

const verifyToken = (token: string): boolean => {
  if (!token) return false;

  try {
    const payload: any = jwt.verify(token, process.env.TOKEN_SECRET);
    return !!(payload.userId && payload.displayName);
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
    res.status(401).json({ status: 'unauthorized' });
  }
};

export default authMiddleware;
