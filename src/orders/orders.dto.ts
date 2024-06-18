/* eslint-disable prettier/prettier */
import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from "class-validator";
import { OrderProductDto } from "./orderProduct.dto";
import { ApiProperty } from "@nestjs/swagger";



export class CreateOrderDto {
    @ApiProperty({
        description: "ID del usuarios que quiere realizar la orden.",
        type: "string.",
        example: ""
    })
     @IsNotEmpty()
     @IsUUID()
    userId: string;

    @ApiProperty({
        description: "Lista de los productos de la orden.",
        type: "Array de productos",
        example: `[{"id": ""}, {"id": ""}]`
    })
    @IsArray()
    @IsNotEmpty()
    @ArrayMinSize(1)
    products: OrderProductDto[];
}
