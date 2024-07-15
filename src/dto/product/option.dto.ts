import { IsString, IsUrl } from 'class-validator';
import { SizeOption } from './size.dto';

export class Option {
  @IsString()
  color: string;

  @IsUrl()
  image: string;

  sizes: SizeOption[];
}
