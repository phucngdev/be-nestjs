import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductRepository } from './product.repository';
import { ProductController } from './product.controller';
import { OrmModule } from 'src/configs/typeorm/orm.module';

@Module({
  imports: [OrmModule],
  providers: [ProductService, ProductRepository],
  controllers: [ProductController],
  exports: [ProductRepository]
})
export class ProductModule {}
