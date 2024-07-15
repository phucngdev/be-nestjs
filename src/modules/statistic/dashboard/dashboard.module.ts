import { Module } from '@nestjs/common';
import { OrmModule } from 'src/configs/typeorm/orm.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [OrmModule],
  providers: [],
  controllers: [],
})
export class DashboardModule {}
