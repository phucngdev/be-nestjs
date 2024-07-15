import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Category } from 'src/entities/category.entity';
import { DataSource, DeleteResult, Repository } from 'typeorm';

@Injectable()
export class CategoryRepository {
  private categoryRepos: Repository<Category>;
  constructor(@Inject('DATA_SOURCE') private dataSource: DataSource) {
    this.categoryRepos = dataSource.getRepository(Category);
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryRepos.find({
      relations: [
        'products',
        'products.colorSizes.sizes',
        'products.colorSizes.colors',
      ],
    });
  }

  async findById(id: string): Promise<Category> {
    return await this.categoryRepos.findOne({
      where: { category_id: id },
      relations: ['products'],
    });
  }

  async createOne(body: Partial<Category>): Promise<Category> {
    try {
      const { category_name, path } = body;
      const newCategory = new Category();
      newCategory.category_name = category_name;
      newCategory.path = path;
      const saveCategory = await this.categoryRepos.save(newCategory);

      return saveCategory;
    } catch (error) {
      throw new InternalServerErrorException('Internal server error');
    }
  }

  async deleteOne(id: string): Promise<DeleteResult> {
    const category = await this.categoryRepos.findOneBy({ category_id: id });
    if (!category) {
      throw new NotFoundException('Not found category');
    }
    return await this.categoryRepos.delete(id);
  }
}
