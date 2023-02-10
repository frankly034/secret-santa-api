import { IsNotEmpty } from 'class-validator';

export class findByIdParam {
  @IsNotEmpty()
  id: string;
}
