import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import CreateUserDto from "./dto/createUser.dto";
import User from "./user.entiity";

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async createUser(userData: CreateUserDto) {
    const user = await this.userRepository.create(userData);
    this.userRepository.save(user);
    return user;
  }

  async getById(id: string) {
    const user = await this.userRepository.findOne({ id });
    if(user){
      return user;
    }
    throw new HttpException("User not found", HttpStatus.NOT_FOUND);
  }

  async getByEmail(email: string) {
    const user = await this.userRepository.findOne({ email });
    if(user){
      return user;
    }
    throw new HttpException("User not found", HttpStatus.NOT_FOUND);
  }
}
