import { IsEmail, IsNumber, IsString, Length, Max, Min } from 'class-validator';

export class UserDto {
  @IsString()
  user_name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsNumber()
  @Min(0)
  @Max(1)
  role: number;
}
