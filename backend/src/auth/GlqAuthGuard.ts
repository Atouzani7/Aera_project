import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class GqlAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context).getContext();
    const token = ctx.req?.cookies?.['jwt'];

    if (!token) throw new UnauthorizedException('Vous devez être connecté');

    try {
      const decoded = this.jwtService.verify(token);
      ctx.user = decoded;
      return true;
    } catch {
      console.log(token);
      throw new UnauthorizedException('Token invalide');
    }
  }
}
