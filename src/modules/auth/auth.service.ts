import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from '../users/user.repository';
import { RegisterDto } from 'src/dto/register/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from 'src/dto/login/login.dto';
import { IUserResponse, UserService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterGoogleDto } from 'src/dto/register/google.dto';
import { User } from 'src/entities/user.entity';
import { LoginGoogleDto } from 'src/dto/login/google.dto';

interface PayloadToken {
  user_id: string;
  user_name: string;
  email: string;
  avatar: string;
  role: number;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepos: UserRepository,
    private readonly jwtService: JwtService
  ) {}
  async registerService(registerDto: RegisterDto) {
    try {
      const hashedPassword = await bcrypt.hash(registerDto.password, 10);
      const createdUser = {
        ...registerDto,
        password: hashedPassword,
      };
      await this.userRepos.createOne(createdUser);
      return {
        message: 'Account create successfully',
      };
    } catch (error) {
      throw new InternalServerErrorException('Internal server error');
    }
  }
  async registerGoogleService(RegisterGoogleDto: RegisterGoogleDto) {
    try {
      const newUser = new User();
      newUser.email = RegisterGoogleDto.email;
      newUser.user_name = RegisterGoogleDto.user_name;
      newUser.avatar = RegisterGoogleDto.avatar;
      newUser.password = `register-with-google-${newUser.email}`;

      const result = await this.userRepos.createOne(newUser);

      if (result) {
        const response = await this.loginGoogleService({ email: result.email });
        return {
          message: 'Account create successfully',
          response,
        };
      }
    } catch (error) {
      throw new InternalServerErrorException('Internal server error');
    }
  }

  async loginService(loginDto: LoginDto) {
    try {
      const userWithEmail = await this.userRepos.findByEmail(loginDto.email);
      const isPasswordValid = await bcrypt.compare(
        loginDto.password,
        userWithEmail.password
      );
      if (!isPasswordValid) {
        throw new UnauthorizedException('Email or password is incorrect');
      }
      const dataPayload: PayloadToken = {
        user_id: userWithEmail.user_id,
        user_name: userWithEmail.user_name,
        email: userWithEmail.email,
        avatar: userWithEmail.avatar,
        role: userWithEmail.role,
      };
      const accessToken = this.jwtService.sign(dataPayload);
      const refreshToken = this.jwtService.sign(dataPayload, {
        secret: process.env.REFRESH_SECRET_KEY,
        expiresIn: '7d',
      });
      return {
        AT: accessToken,
        RT: refreshToken,
      };
    } catch (error) {
      throw new InternalServerErrorException('Internal server error');
    }
  }
  async loginGoogleService(LoginGoogleDto: LoginGoogleDto) {
    try {
      const userWithEmail = await this.userRepos.findByEmail(
        LoginGoogleDto.email
      );
      if (!userWithEmail) {
        throw new UnauthorizedException('Login fail');
      }
      const dataPayload: PayloadToken = {
        user_id: userWithEmail.user_id,
        user_name: userWithEmail.user_name,
        email: userWithEmail.email,
        avatar: userWithEmail.avatar,
        role: userWithEmail.role,
      };
      const accessToken = this.jwtService.sign(dataPayload, {
        secret: process.env.ACCESS_SECRET_KEY,
        expiresIn: '8h',
      });
      const refreshToken = this.jwtService.sign(dataPayload, {
        secret: process.env.REFRESH_SECRET_KEY,
        expiresIn: '7d',
      });
      return {
        AT: accessToken,
        RT: refreshToken,
      };
    } catch (error) {
      throw new InternalServerErrorException('Internal server error');
    }
  }

  async refreshToken(token: string) {
    try {
      const decoded = await this.jwtService.verify(token, {
        secret: process.env.REFRESH_SECRET_KEY,
      });

      const userWithId = await this.userRepos.findById(decoded.user_id);
      if (userWithId) {
        if (userWithId.email === decoded.email) {
          const newPayloadToken: PayloadToken = {
            user_id: decoded.user_id,
            user_name: decoded.user_name,
            email: decoded.email,
            avatar: decoded.avatar,
            role: decoded.role,
          };
          const accessToken = this.jwtService.sign(newPayloadToken);
          return { AT: accessToken };
        }
      }
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
