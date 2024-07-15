import {
  Body,
  Controller,
  Headers,
  HttpCode,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from 'src/dto/register/register.dto';
import { LoginDto } from 'src/dto/login/login.dto';
import { RegisterGoogleDto } from 'src/dto/register/google.dto';
import { LoginGoogleDto } from 'src/dto/login/google.dto';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @HttpCode(201)
  async addUserController(@Body() registerDto: RegisterDto) {
    return await this.authService.registerService(registerDto);
  }

  @Post('/register/google')
  @HttpCode(201)
  async registerGoogleController(@Body() RegisterGoogleDto: RegisterGoogleDto) {
    return await this.authService.registerGoogleService(RegisterGoogleDto);
  }

  @Post('/login')
  @HttpCode(200)
  async loginController(@Body() loginDto: LoginDto) {
    return await this.authService.loginService(loginDto);
  }

  @Post('/login/google')
  @HttpCode(200)
  async loginGoogleController(@Body() LoginGoogleDto: LoginGoogleDto) {
    return await this.authService.loginGoogleService(LoginGoogleDto);
  }

  @Post('/refresh')
  async refreshTokenController(@Headers('authorization') headers: string) {
    const tokenSplit = headers.split(' ')[1];
    if (!tokenSplit) {
      throw new UnauthorizedException('Missing refresh token');
    } else {
      return await this.authService.refreshToken(tokenSplit);
    }
  }
}
