import { Injectable } from '@nestjs/common';
import { MockUserDataBase } from 'src/mockusers/mockusersinstance';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UsersService {
  create(createUserInput: CreateUserInput) {
    return MockUserDataBase.addUser(createUserInput);
  }

  findAll() {
    return MockUserDataBase.getUsers();
  }

  findOne(id: string) {
    const foundUser = MockUserDataBase.getOneUser(id);
    if (!foundUser) throw new Error('User not found');
    return foundUser;
  }

  update(id: string, updateUserInput: UpdateUserInput) {
    const updatedUser = MockUserDataBase.updateUser(id, updateUserInput);
    if (!updatedUser) throw new Error('User not found');
    return updatedUser;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
