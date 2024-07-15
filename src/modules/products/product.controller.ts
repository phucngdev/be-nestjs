import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from 'src/entities/product.entity';
import { ProductDto } from 'src/dto/product/product.dto';

@Controller('/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @HttpCode(200)
  async getAllProductsController(
    @Query('page') page: number,
    @Query('limit') limit: number
  ): Promise<Product[]> {
    return await this.productService.getAllProductsService(page, limit);
  }

  @Get('/:id')
  @HttpCode(200)
  async GetOneController(@Param() id: any): Promise<Product> {
    return await this.productService.getOneService(id.id);
  }

  @Post('/create')
  @HttpCode(201)
  async addProductController(@Body() productDto: ProductDto) {
    return await this.productService.createProductService(productDto);
  }
}
