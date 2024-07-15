import { Injectable } from "@nestjs/common";
import { OrderRepository } from "./order.repository";
import { Order } from "src/entities/order.entity";
import { OrderDto } from "src/dto/order/order.dto";
import { JwtService } from "@nestjs/jwt";
import { DeleteResult } from "typeorm";

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepos: OrderRepository,
    private readonly jwtService: JwtService
  ) {
  }

  async getAllOrdersService(): Promise<Order[]> {
    return await this.orderRepos.findAll();
  }

  async getOrderByIdService(token: string, orderId: string): Promise<Order> {
    const payloadToken = this.jwtService.decode(token);
    return await this.orderRepos.findById(payloadToken.user_id, orderId);
  }

  async createOrderService(data: OrderDto, token: string): Promise<Order> {
    const payloadToken = this.jwtService.decode(token);
    return this.orderRepos.createOne(data, payloadToken.user_id);
  }

  async deleteOrderService(token: string, orderId: string): Promise<DeleteResult> {
    const payloadToken = this.jwtService.decode(token);
    return await this.orderRepos.deleteOne(payloadToken.user_id, orderId);
  }
}
