import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/GlqAuthGuard';

// import { Arg } from 'type-graphql';
@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  //? MUTATIONS __________________________________________________________________________________________________

  @Mutation(() => User)
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.userService.create(createUserInput);
  }
  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.remove(id);
  }

  @Mutation(() => User)
  archiveUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.archive(id);
  }

  @Mutation(() => User)
  unarchiveUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.unarchive(id);
  }

  //? QUERIES __________________________________________________________________________________________________

  @Query(() => [User], { name: 'findAllUsers' })
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => [User], { name: 'findAllUsersWithWorkspaces' })
  findAllWithWorkspaces(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findAllWithWorkspace(id);
  }

  @Query(() => User, { name: 'userById' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne(id);
  }

  @Query(() => User, { name: 'findByEmail' })
  findByEmail(@Args('email') email: string) {
    return this.userService.findByEmail(email);
  }

  @Query(() => [User], { name: 'findUserByRole' })
  @UseGuards(GqlAuthGuard)
  findUserByRole(@Args('role') role: string) {
    return this.userService.findUserByRole(role);
  }
}
