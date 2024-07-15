import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('/payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('/zalopay')
  @HttpCode(200)
  async zalopayController(@Body() data: any): Promise<any> {
    return await this.paymentService.zalopayService(data);
  }

  @Post('/callback')
  @HttpCode(200)
  async zalopayCallbackController(@Body() data: any): Promise<any> {
    return await this.paymentService.zalopayCallbackService(data);
  }

  @Post('/check-status/:app_trans_id')
  @HttpCode(200)
  async zalopayCheckStatusController(
    @Param() app_trans_id: string
  ): Promise<any> {
    return await this.paymentService.zalopayCheckStatusService(app_trans_id);
  }
}
