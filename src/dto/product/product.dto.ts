import { IsArray, IsNumber, IsString, IsUrl, MaxLength } from 'class-validator';
import { Category } from 'src/entities/category.entity';
import { Color } from 'src/entities/color.entity';
import { ColorSize } from 'src/entities/colorSize.entity';
import { Size } from 'src/entities/size.entity';
import { User } from 'src/entities/user.entity';
import { Option } from './option.dto';

export class ProductDto {
  @IsString()
  product_name: string;

  @IsUrl()
  thumbnail: string;

  @IsUrl()
  thumbnail_hover: string;

  @IsArray()
  images: string[];

  @IsNumber()
  discount: number;

  @IsString()
  author: User[];

  @IsString()
  description: string;

  @IsUrl()
  description_image: string;

  @IsNumber()
  status: number;

  @IsString()
  category: Category;

  @IsNumber()
  price: number;

  // colorSizes: ColorSize[];
  option: Option[];
}
