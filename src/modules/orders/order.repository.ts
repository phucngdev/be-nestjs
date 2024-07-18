import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { OrderDto } from 'src/dto/order/order.dto';
import { Order } from 'src/entities/order.entity';
import { OrderDetail } from 'src/entities/orderDetail.entity';
import { DataSource, DeleteResult, Repository } from 'typeorm';
import { UserRepository } from '../users/user.repository';
import { ProductRepository } from '../products/product.repository';

@Injectable()
export class OrderRepository {
  private orderRepos: Repository<Order>;
  private orderDetailRepos: Repository<OrderDetail>;

  constructor(
    @Inject('DATA_SOURCE') private readonly dataSource: DataSource,
    private readonly productRepos: ProductRepository,
    private readonly userRepos: UserRepository
  ) {
    this.orderRepos = dataSource.getRepository(Order);
    this.orderDetailRepos = dataSource.getRepository(OrderDetail);
  }

  async findAll(): Promise<Order[]> {
    const orders = await this.orderRepos.find({
      relations: ['order_details', 'user', 'order_details.product'],
    });
    return orders;
  }

  // async findProductsByOrder(orderId: string): Promise<OrderDetail[]> {
  //   const orders =  await this.findAll()
  // }

  async findById(userId: string, orderId: string): Promise<Order> {
    // const user = await this.userRepos.findById(userId);
    // if (!user) {
    //   throw new NotFoundException("Not found user");
    // }
    return await this.orderRepos.findOne({
      where: { order_id: orderId },
      relations: ['order_details', 'order_details.product'],
    });
  }

  async createOne(data: any, id: any): Promise<Order> {
    try {
      let totalAmount = 0;
      // tạo order
      const order = new Order();
      order.user = id;
      order.note = data.note;

      // lưu order vào db
      const orderSave = await this.orderRepos.save(order);

      // lặp qua và tạo order detail
      for (const orde of data.order_detail) {
        const orderDetail = new OrderDetail();
        orderDetail.product = orde.product;
        orderDetail.order = orderSave;
        const product = await this.productRepos.findById(orde.product);
        orderDetail.quantity = orde.quantity;
        if (product) {
          totalAmount += product.price * orde.quantity;
        }
        await this.orderDetailRepos.save(orderDetail);
      }

      // Gán tổng số tiền vào đơn hàng
      order.total_amount = totalAmount;

      // Lưu lại đơn hàng với tổng số tiền
      await this.orderRepos.save(order);
      return orderSave;
    } catch (error) {
      throw new InternalServerErrorException('Internal server error');
    }
  }

  async deleteOne(userId: string, orderId: string): Promise<DeleteResult> {
    const user = await this.userRepos.findById(userId);
    if (!user) {
      throw new NotFoundException('Not found user');
    }
    try {
      return await this.orderRepos.delete(orderId);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException('Internal server error');
    }
  }
}
