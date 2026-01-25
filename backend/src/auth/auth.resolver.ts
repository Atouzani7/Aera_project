import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth, LogoutResponse } from './entities/auth.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from 'src/user/entities/user.entity';
import { GqlAuthGuard } from './gqlAuthGuard';
import { UserService } from 'src/user/user.service';
// import { CreateAuthInput } from './dto/create-auth.input';
// import { UpdateAuthInput } from './dto/update-auth.input';

@Resolver(() => Auth)
export class AuthResolver {
  [x: string]: any;
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  //? _________________________________________ Mutations _________________________________________
  @Mutation(() => Auth)
  async signIn(
    @Args('email') email: string,
    @Args('password') password: string,
    @Context() ctx,
  ) {
    const result = await this.authService.signIn({
      email,
      password,
    });

    if (!result) {
      throw new Error("Email ou mot de passe invalide'");
    }

    const { user, token } = result;

    ctx.res.cookie('jwt', token, {
      httpOnly: true,
      secure: false, // true en prod (HTTPS)
      sameSite: 'none',
      maxAge: 24 * 60 * 60 * 1000, // 1 jour
    });

    return {
      access_token: token,
      user,
    };
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => LogoutResponse)
  logout(@Context() ctx) {
    return this.authService.logout(ctx.req, ctx.res);
  }

  @Mutation(() => Auth)
  register(
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('firstname') firstname: string,
    @Args('lastname') lastname: string,
    @Args('workspaceName', { nullable: true }) workspaceName?: string,
  ) {
    return this.authService.register({
      email,
      password,
      firstname,
      lastname,
      workspaceName,
    });
  }

  //? _________________________________________ QUERIES _________________________________________
  // user.resolver.ts ou auth.resolver.ts
  @Query(() => UserEntity, { name: 'me' })
  @UseGuards(GqlAuthGuard)
  async me(@Context() context) {
    console.log('--- HEADERS REÇUS ---');
    console.log(context.req.headers); // Regarde si "authorization" existe ici

    const user = context.req.user;
    console.log('--- USER DÉCODÉ ---');
    console.log(user);

    return this.userService.findOne(user.userId);
  }

  // @Mutation(() => Auth)
  // createAuth(@Args('createAuthInput') createAuthInput: CreateAuthInput) {
  //   return this.authService.create(createAuthInput);
  // }

  // @Query(() => [Auth], { name: 'auth' })
  // findAll() {
  //   return this.authService.findAll();
  // }

  // @Query(() => Auth, { name: 'auth' })
  // findOne(@Args('id', { type: () => Int }) id: string) {
  //   return this.authService.findOne(id);
  // }

  // @Mutation(() => Auth)
  // updateAuth(@Args('updateAuthInput') updateAuthInput: UpdateAuthInput) {
  //   return this.authService.update(updateAuthInput.id, updateAuthInput);
  // }

  // @Mutation(() => Auth)
  // removeAuth(@Args('id', { type: () => Int }) id: number) {
  //   return this.authService.remove(id);
  // }
}
