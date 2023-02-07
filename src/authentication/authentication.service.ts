import {
  CACHE_MANAGER,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Cache } from 'cache-manager';

import { PostgresErrorCode } from 'src/database/postgresErrorCodes.enum';
import { CustomBadRequestException } from 'src/Exceptions/CustomBadRequestException';
import { MailService } from 'src/mail/mail.service';
import { UserService } from 'src/users/users.service';
import RegistrationDto from './dto/registration.dto';
import { TokenPayload } from './tokenPayload.interface';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async register(registrationData: RegistrationDto) {
    try {
      const newUser = await this.userService.createUser(registrationData);
      return newUser;
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new CustomBadRequestException('User with email already exists');
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAuthenticatedUser(id: string, plainPassword: string) {
    await this.verifyOTP(id, plainPassword);
    const user = await this.userService.getById(id);
    return user;
  }

  private async verifyOTP(id: string, password: string) {
    const otp = await this.cacheManager.get(id);
    if (!otp || otp !== password) {
      throw new CustomBadRequestException('Invalid otp crednetials');
    }
  }

  async otp(email: string) {
    const user = await this.userService.getByEmailOrCreate(email);
    const otp = await this.generateOtp(user.id);
    const url = `${this.configService.get('FRONTENT_APP_BASEURL')}?id=${
      user.id
    }&otp=${otp}`;
    await this.mailService.sendUserConfirmation(user.email, url);
    return { id: user.id, password: otp };
  }

  private async generateOtp(id: string): Promise<string> {
    const now = new Date();
    const otp = now.getTime().toString(36);
    await this.cacheManager.set(id, otp, {
      ttl: this.configService.get('OTP_EXPIRY_TIME'),
    });
    return otp;
  }

  getCookieWithJwtToken(id: string) {
    const payload: TokenPayload = { id };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_EXPIRY_TIME',
    )}`;
  }
}
