import { Module } from '@nestjs/common';
import { OrmModule } from 'src/configs/typeorm/orm.module';

import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../users/user.module';
import { ProductModule } from '../products/product.module';
import { PaymentController } from './payment.controller';
import { PaymentRepository } from './payment.repository';
import { PaymentService } from './payment.service';

@Module({
  imports: [
    OrmModule,
    JwtModule.register({
      secret: process.env.ACCESS_SECRET_KEY,
    }),
    UserModule,
    ProductModule,
  ],
  providers: [PaymentService, PaymentRepository],
  controllers: [PaymentController],
})
export class PaymentModule {}
