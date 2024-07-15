import { Category } from 'src/entities/category.entity';
import { Color } from 'src/entities/color.entity';
import { Order } from 'src/entities/order.entity';
import { OrderDetail } from 'src/entities/orderDetail.entity';
import { Transaction } from 'src/entities/transaction.entity';
import { Product } from 'src/entities/product.entity';
import { Size } from 'src/entities/size.entity';
import { User } from 'src/entities/user.entity';
import { DataSource } from 'typeorm';
import { Payment } from 'src/entities/payment.entity';
import { ColorSize } from 'src/entities/colorSize.entity';

export const ormProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [
          User,
          Order,
          OrderDetail,
          Category,
          Transaction,
          Size,
          Color,
          Product,
          Payment,
          ColorSize,
        ],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
