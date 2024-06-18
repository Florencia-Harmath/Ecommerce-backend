/* eslint-disable prettier/prettier */
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ProductsDto {
  @ApiProperty({
    description: 'nombre del producto.',
    type: 'string.',
    example: 'Iphone 20',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'descripción del producto.',
    type: 'string',
    example: 'Telefono celular de APPLE, el mejor del mercado.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Precio del producto.',
    type: 'number',
    example: '10.99',
  })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    description:
      'Stock del producto, al no aceptar un valor vacio, si no hay stock colocar 0.',
    type: 'number',
    example: '100',
  })
  @IsNumber()
  @IsNotEmpty()
  stock: number;

  @ApiProperty({
    description:
      'URL de la imagen del producto, en caso de que no sea especificada, tiene una por defecto.',
    type: 'string',
    example:
      'https://www.google.com/url?sa=i&url=https%3A%2F%2Fes.wikipedia.org%2Fwiki%',
  })
  imgUrl: string;

  @ApiProperty({
    description: 'Nombre de la categoría del producto.',
    type: 'string',
    example: 'smartphone',
  })
  @IsString()
  @IsNotEmpty()
  category: string;
}

export class updateProductDTO extends PartialType(ProductsDto){}