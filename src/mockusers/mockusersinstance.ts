import { randomUUID } from 'crypto';
import { CreateUserInput } from 'src/users/dto/create-user.input';
import { UpdateUserInput } from 'src/users/dto/update-user.input';
import { UserData } from 'src/users/entities/user.entity';

class MockUsers {
  public users: UserData[] = [];
  currentMock: string;

  public constructor(currentMock?: string) {
    this.currentMock = currentMock;
  }

  public getMessage() {
    return this.currentMock;
  }

  public addUser(userDTO: CreateUserInput): UserData {
    const newUser = Object.assign({ id: randomUUID(), ...userDTO });
    this.users.push(newUser);
    return newUser;
  }

  public getUsers(): UserData[] {
    return this.users;
  }

  public getOneUser(id: string): UserData | undefined {
    return this.users.find((user) => user.id === id);
  }

  public updateUser(id: string, updateDTO: UpdateUserInput): UserData | undefined {
    const foundUser = this.users.find((user) => user.id === id);
    if (!foundUser) return foundUser;
    const updateUser: UserData = { ...foundUser, ...updateDTO };
    this.users = [...this.users.filter((user) => user.id !== id), updateUser];
    return updateUser;
  }
}

export const MockUserDataBase = new MockUsers(
  'Latest run server mock instance',
);
