import { Injectable } from '@nestjs/common';
import { User } from './models/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: User) {}

  async create(data: User): Promise<User> {
    return data;
  }

  async findOne(id: number): Promise<User> {
    return {
      id,
      email: 'test@gmail.com',
      first_name: '',
      last_name: '',
      password: '',
      rol: 1,
    };
  }

  async update(id: number, user: User): Promise<User> {
    return user;
  }

  async delete(id: number): Promise<boolean> {
    return true;
  }
}
