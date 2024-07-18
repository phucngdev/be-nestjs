import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductRepository } from './product.repository';
import { ProductController } from './product.controller';
import { OrmModule } from 'src/configs/typeorm/orm.module';
import { UserModule } from '../users/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [OrmModule, UserModule,
    JwtModule.register({
      secret: process.env.ACCESS_SECRET_KEY
    })
  ],
  providers: [ProductService, ProductRepository],
  controllers: [ProductController],
  exports: [ProductRepository]
})
export class ProductModule {}
