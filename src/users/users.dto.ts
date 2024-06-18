/* eslint-disable prettier/prettier */

import { ApiProperty, PartialType, PickType } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator";
import { Role } from "../roles/roles.enum";

export class CreateUserDTO {

    @ApiProperty({
        description: 'Nombre del usuario.',
        minLength: 3,
        maxLength: 80,
        type: 'string',
        example: 'Pedro Gomez'
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(80)
    name: string;
    
    @ApiProperty({
        description: 'Correo electronico del usuario.',
        type: 'string',
        example: 'pedrogomez@example.com'
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;
    
    @ApiProperty({
        description: 'Contraseña del usuario, mínimo 8 caracteres, una mayuscula y carácteres especiales.',
        type: 'string',
        example: 'Pepito0303!!'
    })
    @IsStrongPassword()
    @MaxLength(70)
    password: string;

    @ApiProperty({
        description: 'Confirmacion de la contraseña ingresada.',
        type: 'string',
        example: 'Pepito0303!!'
    })
    @IsStrongPassword()
    @MaxLength(70)
    confirmPassword: string;
    
    @ApiProperty({
        description: 'Direccion del usuario.',
        type: 'string',
        example: 'calle falsa 123'
    })
    @MinLength(3)
    @MaxLength(80)
    address: string;
    
    @ApiProperty({
        description: 'Telefono del usuario.',
        type: 'number',
        example: 1138953016
    })
    @IsNotEmpty()
    phone: number;
    
    @ApiProperty({
        description:'Pais del usuario.',
        type:'string',
        example: 'Argentina'
    })
    @IsString()
    @MinLength(5)
    @MaxLength(20)
    country: string;
    
    @ApiProperty({
        description:'Ciudad del usuario.',
        type:'string',
        example: 'Buenos Aires'
    })
    @IsString()
    @MinLength(5)
    @MaxLength(20)
    city: string;

    // @IsOptional()
    // role: Role[];
}

export class LogginUserDTO extends PickType(CreateUserDTO, ['email', 'password']){}

export class UpdateUserDTO extends PartialType(CreateUserDTO) {}

