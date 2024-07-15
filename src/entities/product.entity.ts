import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { Order } from './order.entity';
import { Color } from './color.entity';
import { Size } from './size.entity';
import { OrderDetail } from './orderDetail.entity';
import { ColorSize } from './colorSize.entity';
import { User } from './user.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  product_id: string;

  @Column()
  product_name: string;

  @Column()
  thumbnail: string;

  @Column()
  thumbnail_hover: string;

  @Column('simple-array')
  images: string[];

  @Column({ default: 1 })
  status: number;

  @Column()
  price: number;

  @Column({ default: 0 })
  discount: number;

  @Column({ default: 0 })
  sold: number;

  @ManyToMany(() => User, (user) => user.products)
  author: User[];

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  description_image: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'current_timestamp',
  })
  update_at: Date;

  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  category: Category;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.product)
  orderDetails: OrderDetail[];

  @OneToMany(() => ColorSize, (colsiz) => colsiz.product)
  colorSizes: ColorSize[];
}
