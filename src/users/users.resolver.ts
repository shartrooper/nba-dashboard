import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UserData } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => UserData)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => UserData)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Query(() => [UserData], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => UserData, { name: 'user' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.usersService.findOne(id);
  }

  @Mutation(() => UserData)
  updateUser(
    @Args('id') id: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return this.usersService.update(id, updateUserInput);
  }
  /*
  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.remove(id);
  }
  */
}
