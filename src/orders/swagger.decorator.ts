import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

export function AddOrderSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Crear una nueva orden de compra.',
      description:
        'Permite al usuario logueado crear una nueva orden de compra, simulando un carrito de compras.',
    }),
    ApiResponse({
      status: 201,
      description: 'Orden de compra creada exitosamente.',
    }),
    ApiResponse({
      status: 400,
      description: 'Error al crear la orden de compra.',
    }),
  );
}

export function GetAllOrdersSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Obtener todas las ordenes de compra',
      description:
        'Unicamente los usuarios logueados con el rol de DMIN pueden acceder a todas las ordenes de compra',
    }),
    ApiResponse({
      status: 200,
      description: 'Órdenes obtenidas exitosamente.',
    }),
    ApiResponse({ status: 400, description: 'Error al obtener las órdenes.' }),
  );
}

export function GetOrderByIdSwagger() {
    return applyDecorators(
        ApiBearerAuth(),
        ApiOperation({
            summary: 'Obtener una orden de compra por ID.',
            description: 'Permite a los usuarios logueados obtener una orden de compra por su ID.',
        }),
        ApiResponse({ status: 200, description: 'Orden de compra obtenida correctamente.' }),
        ApiResponse({ status: 400, description: 'Error al obtener la orden de compra.' })                
    )
}

export function DeleteOrderByIdSwagger(){
    return applyDecorators(
        ApiBearerAuth(),
        ApiOperation({
            summary: 'Borrar una order por ID',
            description: 'Borrar la orden por el ID'
        }),
        ApiResponse({status: 200, description: 'Orden eliminada correctamente'}),
        ApiResponse({status: 400, description: 'Error al querer eliminar la orden'
        })
    )
}


