import { IsString, IsUrl } from 'class-validator';

export class PaymentDto {
  @IsString()
  payment_method: string;

  @IsUrl()
  image: string;
}
