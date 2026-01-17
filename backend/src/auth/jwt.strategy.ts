import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { cookieExtractor } from './cookieExtractor';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        cookieExtractor, // Extract JWT from cookies pour l'envoyer au header Authorization
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey:
        process.env.JWT_SECRET ||
        '71509c20e99e3cc7f81435d3cbbf22c571181a4a57b2b08f95c3aa4883783cec',
    });
  }

  async validate(payload: any) {
    const id = payload.sub || payload.id;
    if (!id) {
    }
    return { id: Number(id), username: payload.username };
    // return { userId: payload.sub, username: payload.username, id: payload.id };
  }
}
