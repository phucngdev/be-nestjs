import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Color } from './color.entity';
import { Product } from './product.entity';
import { ColorSize } from './colorSize.entity';
import { OrderDetail } from './orderDetail.entity';

@Entity('sizes')
export class Size {
  @PrimaryGeneratedColumn('uuid')
  size_id: string;

  @Column()
  size_name: string;

  @Column({ default: 0 })
  quantity: number;

  @ManyToOne(() => ColorSize, (colsiz) => colsiz.sizes)
  colorSize: ColorSize;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.size)
  orderDetails: OrderDetail;
}
