// src/helpers/swagger.decorators.ts
import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

export function GetUsersSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Obtener todos los usuarios.',
      description: 'Unicamente los usuarios logueados con el rol de ADMIN tienen acceso a visualizar todos los usuarios.',
    }),
    ApiResponse({ status: 200, description: 'Usuarios encontrados.' }),
    ApiResponse({ status: 400, description: 'Error al obtener los usuarios.' }),
  );
}

export function DeleteUserSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Eliminar un usuario.',
      description: 'Eliminar un usuario por ID.',
    }),
    ApiResponse({ status: 204, description: 'Usuario eliminado correctamente.' }),
    ApiResponse({ status: 400, description: 'Error al eliminar el usuario.' }),
  );
}

export function UpdateUserSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Actualizar un usuario.',
      description: 'Actualizar un usuario por ID.',
    }),
    ApiResponse({ status: 200, description: 'Usuario modificado correctamente.' }),
    ApiResponse({ status: 400, description: 'Error al modificar el usuario.' }),
  );
}

export function GetUserByIdSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Obtener un usuario por ID.',
      description: 'Obtener un usuario por ID.',
    }),
    ApiResponse({ status: 200, description: 'Usuario encontrado.' }),
    ApiResponse({ status: 400, description: 'Error al obtener el usuario.' }),
  );
}
