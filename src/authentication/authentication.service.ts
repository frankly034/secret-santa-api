import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PostgresErrorCode } from 'src/database/postgresErrorCodes.enum';
import { UserService } from 'src/users/users.service';
import RegistrationDto from './dto/registration.dto';
const redis = {};
@Injectable()
export class AuthenticationService {
  constructor(private userService: UserService) {}

  async register(registrationData: RegistrationDto) {
    try {
      const newUser = await this.userService.createUser(registrationData);
      return newUser;
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException(
          'User with emai already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAuthenticatedUser(id: string, plainPassword: string) {
    try {
      const user = await this.userService.getById(id);
      await this.verifyOTP(id, plainPassword);
      return user;
    } catch (error) {
      throw new HttpException('Invalid otp crednetials', HttpStatus.BAD_REQUEST);
    }
  }

  async verifyOTP(id: string, password: string) {
    const otp = redis[id];
    if (otp && otp.id === id && otp.password === password) {
      return true;
    }
    throw new HttpException('Invalid otp crednetials', HttpStatus.BAD_REQUEST);
  }

  async otp(email: string) {
    let user = await this.userService.getByEmailOrCreate(email);
    const otp = this.generateOtp(user.id);
    return { id: user.id, password: otp };
  }

  generateOtp(id: string): string {
    const now = new Date();
    const otp = now.getTime().toString(36);
    redis[id] = { id, password: otp };
    return otp;
  }
}
