import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Color } from './color.entity';
import { Size } from './size.entity';
import { Product } from './product.entity';

@Entity('color-size')
export class ColorSize {
  @PrimaryGeneratedColumn('uuid')
  color_size_id: string;

  @OneToOne(() => Color, (color) => color.colorSize)
  @JoinColumn()
  colors: Color;

  @OneToMany(() => Size, (size) => size.colorSize)
  sizes: Size[];

  @ManyToOne(() => Product, (prod) => prod.colorSizes)
  product: Product;
}
