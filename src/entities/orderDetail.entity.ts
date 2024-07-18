import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';
import { Order } from './order.entity';
import { Color } from './color.entity';
import { Size } from './size.entity';

@Entity('order-detail')
export class OrderDetail {
  @PrimaryGeneratedColumn('uuid')
  order_detail_id: string;

  @ManyToOne(() => Order, (order) => order.order_details, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne(() => Product, (prod) => prod.orderDetails)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => Color, (color) => color.orderDetails)
  @JoinColumn({ name: 'color_id' })
  color: Color;

  @ManyToOne(() => Size, (size) => size.orderDetails)
  @JoinColumn({ name: 'size_id' })
  size: Size;

  @Column()
  quantity: number;
}
