import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomBadRequestException } from 'src/Exceptions/CustomBadRequestException';
import { CustomNotFoundException } from 'src/Exceptions/CustomNotFoundException';
import { Repository } from 'typeorm';

import CreateUserDto from './dto/createUser.dto';
import User from './user.entiity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(userData: CreateUserDto) {
    const user = await this.userRepository.create(userData);
    const savedUser = await this.userRepository.save(user);
    return savedUser;
  }

  async getById(id: string) {
    let user;
    try {
      user = await this.userRepository.findOne({ id });
    } catch (error) {
      throw new CustomBadRequestException('Invalid user credentials');
    }
    if(!user){
      throw new CustomNotFoundException('User not found');
    }
    return user;
  }

  async getByEmail(email: string) {
    const user = await this.userRepository.findOne({ email });
    if (user) {
      return user;
    }
    throw new CustomNotFoundException('User not found');
  }

  async getByEmailOrCreate(email: string) {
    let user = await this.userRepository.findOne({ email });
    if (!user) {
      user = await this.createUser({ email, firstName: '', lastName: '' });
    }
    return user;
  }
}
