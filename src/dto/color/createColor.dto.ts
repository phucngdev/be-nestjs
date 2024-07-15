import { IsUrl } from "class-validator";

export class CreateColorDto
{
    color_name: string;

    @IsUrl()
    image: string[];
}