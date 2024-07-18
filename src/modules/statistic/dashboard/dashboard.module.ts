import { Module } from '@nestjs/common';
import { OrmModule } from 'src/configs/typeorm/orm.module';
import { JwtModule } from '@nestjs/jwt';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { OrderModule } from 'src/modules/orders/order.module';
import { UserModule } from 'src/modules/users/user.module';

@Module({
  imports: [
    OrmModule,
    OrderModule,
    UserModule,
    JwtModule.register({
      secret: process.env.ACCESS_SECRET_KEY,
    }),
  ],
  providers: [DashboardService],
  controllers: [DashboardController],
})
export class DashboardModule {}
