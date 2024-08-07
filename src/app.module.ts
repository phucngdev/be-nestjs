import { Module } from '@nestjs/common';
import { OrmModule } from './configs/typeorm/orm.module';
import { UserModule } from './modules/users/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { ProductModule } from './modules/products/product.module';
import { CategoryModule } from './modules/categories/category.module';
import { OrderModule } from './modules/orders/order.module';
import { PaymentModule } from './modules/payments/payment.module';
import { DashboardModule } from './modules/statistic/dashboard/dashboard.module';

@Module({
  imports: [
    OrmModule,
    UserModule,
    AuthModule,
    ProductModule,
    CategoryModule,
    OrderModule,
    PaymentModule,
    DashboardModule,
    ConfigModule.forRoot({ envFilePath: '.env.development', isGlobal: true }),
  ]
})
export class AppModule {}
