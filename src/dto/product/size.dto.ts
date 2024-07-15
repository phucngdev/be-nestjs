import { IsNumber, IsString } from 'class-validator';

export class SizeOption {
  @IsString()
  size: string;

  @IsNumber()
  quantity: number;
}
