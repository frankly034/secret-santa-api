import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';

import { AuthenticationService } from './authentication.service';
import OtpDto from './dto/otp.dto';
import RegistrationDto from './dto/registration.dto';
import { LocalAuthenticationGuard } from './localAuthenticationGuard';
import RequestWithUser from './requestWithUser.interface';

@Controller('auth')
export class AuthenticationController {
  constructor(private authService: AuthenticationService) {}

  @Post('signup')
  signup(@Body() userData: RegistrationDto) {
    return this.authService.register(userData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('signin')
  signin(@Req() req: RequestWithUser) {
    return req.user;
  }

  @Post('otp')
  otp(@Body() otp: OtpDto) {
    return this.authService.otp(otp.email);
  }
}
