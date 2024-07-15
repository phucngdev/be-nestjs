import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  // constructor(private readonly userRepos: UserRepository) {}
  async use(req: Request, res: Response, next: NextFunction) {}
}
