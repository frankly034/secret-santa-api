import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';

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
  signin(@Req() req: RequestWithUser, @Res() res: Response) {
    const { user } = req;
    const cookie = this.authService.getCookieWithJwtToken(user.id);
    res.setHeader('Set-Cookie', cookie);
    return res.send(user);
  }

  @Post('otp')
  otp(@Body() otp: OtpDto) {
    return this.authService.otp(otp.email);
  }
}
