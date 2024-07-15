import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './order.entity';
import { Payment } from './payment.entity';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  transaction_id: string;

  @ManyToOne(() => Payment, (payment) => payment.transactions)
  payment: Payment;

  @Column('decimal')
  amount: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  transaction_date: Date;

  @OneToOne(() => Order, (order) => order.transaction, { onDelete: 'CASCADE' })
  @JoinColumn()
  order: Order;
}
