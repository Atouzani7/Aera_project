import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth, LogoutResponse } from './entities/auth.entity';
import { CreateAuthInput } from './dto/create-auth.input';
import { UpdateAuthInput } from './dto/update-auth.input';
import { HttpCode, UseGuards } from '@nestjs/common';
import { access } from 'fs';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Auth)
  createAuth(@Args('createAuthInput') createAuthInput: CreateAuthInput) {
    return this.authService.create(createAuthInput);
  }

  @Query(() => [Auth], { name: 'auth' })
  findAll() {
    return this.authService.findAll();
  }

  @Query(() => Auth, { name: 'auth' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.authService.findOne(id);
  }

  @Mutation(() => Auth)
  updateAuth(@Args('updateAuthInput') updateAuthInput: UpdateAuthInput) {
    return this.authService.update(updateAuthInput.id, updateAuthInput);
  }

  @Mutation(() => Auth)
  removeAuth(@Args('id', { type: () => Int }) id: number) {
    return this.authService.remove(id);
  }

  // @Mutation(() => Auth, { name: 'validateUser' })
  // @HttpCode(200)
  // signIn(@Args('email') email: string, @Args('pass') pass: string) {
  //   return this.authService.signIn(email, pass);
  // }

  @Mutation(() => Auth)
  async signIn(
    name: 'signIn',
    @Args('email') email: string,
    @Args('pass') pass: string,
    @Context() ctx,
  ) {
    const { token, user } = await this.authService.signIn(email, pass);

    // Mettre le token dans un cookie httpOnly
    ctx.res.cookie('jwt', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    });

    return { access_token: token, user };
  }

  @Mutation(() => LogoutResponse)
  logout(@Context() ctx) {
    return this.authService.logout(ctx.res);
  }
}
