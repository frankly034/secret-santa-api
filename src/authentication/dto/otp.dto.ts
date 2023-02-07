import { IsEmail } from 'class-validator';

export class OtpDto {
  @IsEmail()
  email: string;
}

export default OtpDto;
