import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { Category } from 'src/entities/category.entity';
import { CreateCategoryDto } from 'src/dto/category/createCategory.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepos: CategoryRepository) {}

  async createCategoryService(body: CreateCategoryDto): Promise<Category> {
    return await this.categoryRepos.createOne(body);
  }
  async getAllCategories(): Promise<Category[]> {
    return await this.categoryRepos.findAll();
  }

  async getCategoryByIdService(id: string): Promise<Category> {
    return await this.categoryRepos.findById(id);
  }

  async deleteCategoryService(id: string): Promise<boolean> {
    const result = await this.categoryRepos.deleteOne(id);
    return !!result;
  }
}
