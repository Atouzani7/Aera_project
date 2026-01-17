import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    console.log(
      'Headers reçus par le Guard:',
      ctx.getContext().req.headers['authorization'],
    );
    return ctx.getContext().req;
  }

  // Cette méthode est cruciale : elle dit à Nest de dire à Passport
  // de ne PAS essayer de créer une session après avoir validé le JWT.
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const can = await super.canActivate(context);
    if (can) {
      const request = this.getRequest(context);
    }
    return can as boolean;
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      console.log('Erreur Passport Info:', info?.message);
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext().req.user;
    console.log('User dans la requête (req.user):', ctx.getContext().req.user);
    return user;
  },
);
