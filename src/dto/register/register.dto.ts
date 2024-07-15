import { IsEmail, IsString, Length, MaxLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  user_name: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(7, 50)
  password: string;
}
