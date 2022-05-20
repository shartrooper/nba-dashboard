import { randomUUID } from 'crypto';
import { CreateUserInput } from 'src/users/dto/create-user.input';
import { UpdateUserInput } from 'src/users/dto/update-user.input';
import { User } from 'src/users/entities/user.entity';

class MockUsers {
  public users: User[] = [];
  currentMock: string;

  public constructor(currentMock?: string) {
    this.currentMock = currentMock;
  }

  public getMessage() {
    return this.currentMock;
  }

  public addUser(userDTO: CreateUserInput): User {
    const newUser = Object.assign({ id: randomUUID(), ...userDTO });
    this.users.push(newUser);
    return newUser;
  }

  public getUsers(): User[] {
    return this.users;
  }

  public getOneUser(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  public updateUser(id: string, updateDTO: UpdateUserInput): User | undefined {
    const foundUser = this.users.find((user) => user.id === id);
    if (!foundUser) return foundUser;
    const updateUser: User = { ...foundUser, ...updateDTO };
    this.users = [...this.users.filter((user) => user.id !== id), updateUser];
    return updateUser;
  }
}

export const MockUserDataBase = new MockUsers(
  'Latest run server mock instance',
);
