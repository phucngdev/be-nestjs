import { IsArray, IsString } from 'class-validator';

export class OrderDto {
  @IsString()
  note: string;

  @IsArray()
  order_detail: string[];
}
