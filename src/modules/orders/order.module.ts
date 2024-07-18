import { Module } from '@nestjs/common';
import { OrmModule } from 'src/configs/typeorm/orm.module';
import { OrderRepository } from './order.repository';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../users/user.module';
import { ProductModule } from '../products/product.module';

@Module({
  imports: [
    OrmModule,
    JwtModule.register({
      secret: process.env.ACCESS_SECRET_KEY,
    }),
    UserModule,
    ProductModule,
  ],
  providers: [OrderRepository, OrderService],
  controllers: [OrderController],
  exports: [OrderRepository],
})
export class OrderModule {}
