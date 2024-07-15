import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ProductDto } from 'src/dto/product/product.dto';
import { Category } from 'src/entities/category.entity';
import { Color } from 'src/entities/color.entity';
import { ColorSize } from 'src/entities/colorSize.entity';
import { Product } from 'src/entities/product.entity';
import { Size } from 'src/entities/size.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ProductRepository {
  private productRepos: Repository<Product>;
  private colorRepos: Repository<Color>;
  private sizeRepos: Repository<Size>;
  private colorSizeRepos: Repository<ColorSize>;
  private categoryRepos: Repository<Category>;

  constructor(@Inject('DATA_SOURCE') private dataSource: DataSource) {
    this.productRepos = dataSource.getRepository(Product);
    this.colorRepos = dataSource.getRepository(Color);
    this.sizeRepos = dataSource.getRepository(Size);
    this.colorSizeRepos = dataSource.getRepository(ColorSize);
    this.categoryRepos = dataSource.getRepository(Category);
  }

  async findAll(page: number, limit: number): Promise<Product[]> {
    try {
      let result;

      if (page && limit) {
        const [products, totalItems] = await this.productRepos.findAndCount({
          relations: [
            'colorSizes',
            'colorSizes.colors',
            'colorSizes.sizes',
            'category',
          ],
          take: limit,
          skip: (page - 1) * limit,
          order: {
            product_name: 'ASC',
          },
        });
        const totalPages = Math.ceil(totalItems / limit);
        result = {
          products,
          totalItems,
          totalPages,
          page: page,
          limit: limit,
        };
      } else {
        const products = await this.productRepos.find({
          relations: [
            'colorSizes',
            'colorSizes.colors',
            'colorSizes.sizes',
            'category',
          ],
          order: {
            product_name: 'ASC',
          },
        });
        const totalItems = await this.productRepos.count();
        result = {
          products,
          totalItems,
          totalPages: 1,
          page: 1,
          limit: totalItems,
        };
      }

      return result;
    } catch (error) {
      throw new InternalServerErrorException('Internal server error');
    }
  }

  async findById(id: string): Promise<Product> {
    return await this.productRepos.findOne({
      where: { product_id: id },
      relations: [
        'colorSizes',
        'colorSizes.colors',
        'colorSizes.sizes',
        'category',
      ],
    });
  }

  async createOne(data: any): Promise<Product> {
    try {
      const newProduct = new Product();
      newProduct.product_name = data.product_name;
      newProduct.thumbnail = data.thumbnail;
      newProduct.thumbnail_hover = data.thumbnail_hover;
      newProduct.images = data.images;
      newProduct.discount = data.discount;
      newProduct.description = data.description;
      newProduct.description_image = data.description_image;
      newProduct.price = data.price;
      newProduct.status = data.status;

      // Tìm category
      const category = await this.categoryRepos.findOne({
        where: { category_id: data.category },
      });
      if (category) {
        newProduct.category = category;
      } else {
        throw new NotFoundException('Category not found');
      }

      //lưu sản phẩm
      const savedProduct = await this.productRepos.save(newProduct);

      // lặp qua các option
      for (const option of data.option) {
        // Tạo mới màu sắc
        const newColor = new Color();
        newColor.color_name = option.color;
        newColor.image = option.image;

        // Lưu màu sắc vào db
        const savedColor = await this.colorRepos.save(newColor);

        // Tạo ColorSize
        const newColorSize = new ColorSize();
        newColorSize.colors = savedColor;
        newColorSize.product = savedProduct;

        // Lưu ColorSize vào db
        const savedColorSize = await this.colorSizeRepos.save(newColorSize);

        // lặp qua các size của màu
        for (const sizeOption of option.sizes) {
          // Tạo mới
          const newSize = new Size();
          newSize.size_name = sizeOption.size;
          newSize.quantity = sizeOption.quantity;
          newSize.colorSize = savedColorSize;

          // Lưu size vào db
          await this.sizeRepos.save(newSize);
        }
      }

      return savedProduct;
    } catch (error) {
      throw new InternalServerErrorException('Internal server error');
    }
  }
}
