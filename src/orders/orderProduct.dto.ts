/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsUUID, Min } from "class-validator";

export class OrderProductDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
