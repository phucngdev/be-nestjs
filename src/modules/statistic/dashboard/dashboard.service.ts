import { Injectable } from '@nestjs/common';
import { OrderRepository } from 'src/modules/orders/order.repository';

@Injectable()
export class DashboardService {
  constructor(private readonly orderRepos: OrderRepository) {}
  async soldProductService() {
    const orders = (await this.orderRepos.findAll()).filter(
      (order) => order.status === 3
    );
    const product = orders
      .flatMap((order) => order.order_details)
      .map((orderDetail) => orderDetail.product);
    return {
      total: product.length,
      products: product,
    };
  }

  async totalRevenueService() {
    let sum: number = 0;
    const orders = (await this.orderRepos.findAll()).filter(
      (order) => order.status === 3
    );
    const product = orders
      .flatMap((order) => order.order_details)
      .map((orderDetail) => orderDetail.product);

    product.map((item) => {
      sum += item.price;
    });

    return { total: sum };
  }
}
