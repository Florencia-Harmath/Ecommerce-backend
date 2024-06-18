import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

export function UploadProductImageSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Subir imagen de producto.',
      description:
        'Solamente los usuarios logueados como ADMIN pueden subir una imagen del producto seleccionado por ID.',
    }),
    ApiResponse({ status: 200, description: 'Imagen subida correctamente.' }),
    ApiResponse({ status: 400, description: 'Error al subir la imagen.' }),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      description: 'Imagen del producto',
      required: true,
      type: 'multipart/form-data',
      schema: {
        type: 'object',
        properties: {
          file: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    }),
  );
}
