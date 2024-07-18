import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from 'src/entities/product.entity';
import { ProductDto } from 'src/dto/product/product.dto';
import { JwtAuthGuard } from 'src/share/guards/auth.guard';
import { RoleGuard } from 'src/share/guards/role.guard';

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
  async getOneController(@Param('id') id: string): Promise<Product> {
    return await this.productService.getOneService(id);
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard)
  @Post('/create')
  @HttpCode(201)
  async addProductController(@Body() productDto: ProductDto) {
    return await this.productService.createProductService(productDto);
  }
}
