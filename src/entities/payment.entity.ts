import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Transaction } from './transaction.entity';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  payment_id: string;

  @Column()
  payment_method: string;

  @Column()
  image: string;

  @Column({ type: 'datetime', default: () => 'current_timestamp' })
  create_at: Date;

  @OneToMany(() => Transaction, (trans) => trans.payment)
  transactions: Transaction[];
}
