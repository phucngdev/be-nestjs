import { Injectable } from '@nestjs/common';
import { PaymentRepository } from './payment.repository';
import { PaymentDto } from 'src/dto/payment/createPayment.dto';
import { Payment } from 'src/entities/payment.entity';

@Injectable()
export class PaymentService {
  constructor(private readonly paymentRepos: PaymentRepository) {}

  async zalopayService(data: any): Promise<any> {
    return await this.paymentRepos.zalopayRepo(data);
  }

  async zalopayCallbackService(data: any): Promise<any> {
    return await this.paymentRepos.zalopayCallbackRepo(data);
  }

  async zalopayCheckStatusService(app_trans_id: string): Promise<any> {
    return await this.paymentRepos.zalopayCheckStatus(app_trans_id);
  }
}
