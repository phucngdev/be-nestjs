import { IsEmail, IsString, Length, MaxLength } from 'class-validator';

export class RegisterGoogleDto {
  @IsString()
  user_name: string;

  @IsEmail()
  email: string;

  @IsString()
  avatar: string;
}
