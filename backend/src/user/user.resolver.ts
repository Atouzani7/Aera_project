import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

import { Arg } from 'type-graphql';
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

  @Query(() => [User], { name: 'user' })
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne(id);
  }
}
