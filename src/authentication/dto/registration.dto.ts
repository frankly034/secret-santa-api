import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegistrationDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;
}

export default RegistrationDto;
