import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { Product } from 'src/entities/product.entity';
import { ProductDto } from 'src/dto/product/product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly productRepos: ProductRepository) {}

  async getAllProductsService(page: number, limit: number): Promise<Product[]> {
    return await this.productRepos.findAll(page, limit);
  }

  async createProductService(productDto: ProductDto) {
    return this.productRepos.createOne(productDto);
  }

  async getOneService(id: string): Promise<Product> {
    return await this.productRepos.findById(id);
  }
}
