import { IsEmail, IsString, Length, MaxLength } from 'class-validator';

export class LoginGoogleDto {
  @IsEmail()
  email: string;
}
