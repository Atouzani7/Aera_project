import { ExtractJwt } from 'passport-jwt';
import { Request } from 'express';

export const cookieExtractor = (req: Request): string | null => {
  if (req && req.cookies) {
    return req.cookies['jwt'];
  }
  return null;
};
