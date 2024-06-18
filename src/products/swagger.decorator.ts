import { applyDecorators } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse } from "@nestjs/swagger";

export function GetAllProductsSwagger(){
    return applyDecorators(
        ApiOperation({
            summary: 'Obtener lista de productos',
            description: 'Obtiene todos los productos, incluida la información de su categoría.',
          }),
          ApiResponse({ status: 200, description: 'Productos cargados exitosamente.' }),
          ApiResponse({ status: 400, description: 'Error al cargar los productos.' })
    )}

export function ResetProductsSwagger(){
    return applyDecorators(
        ApiBearerAuth(),
        ApiOperation({
            summary: 'Reseteo de la pre-carga de productos',
            description: 'Unicamente los usuarios logueados con el rolo de ADMIN podrán resetear los productos, únicamente si no hay órdenes los productos a resetear'
        }),
        ApiResponse({ status: 200, description: 'Productos reseteados correctamente.' }),
        ApiResponse({ status: 400, description: 'No se pudo resetear los productos.' })
    )  
}

export function CreateProductSwagger(){
    return applyDecorators(
        ApiBearerAuth(),
        ApiOperation({
            summary: 'Crear producto.',
            description:
              'Unicamente los usuarios logueados con el rol de ADMIN podrán crear un nuevo producto.',
          }),
          ApiResponse({ status: 201, description: 'Producto creado exitosamente.' }),
          ApiResponse({ status: 400, description: 'Error al crear el producto.' })
    )
}

export function UpdateProductSwagger(){
    return applyDecorators(
        ApiBearerAuth(),
        ApiOperation({
            summary: 'Modificar producto',
            description:
              'Unicamente los usuarios logueados con role de ADMIN podrán modificar alguna propiedad del producto seleccionado por el ID.',
          }),
          ApiResponse({ status: 200, description: 'Producto modificado exitosamente.' }),
          ApiResponse({ status: 400, description: 'Error al modificar el producto.' })
    )
}

export function DeleteProductSwagger(){
    return applyDecorators(
        ApiBearerAuth(),
        ApiOperation({
            summary: 'Eliminar producto.',
            description:
              'Elimina un producto por su ID. Solo accesible para usuarios con rol ADMIN.',
          }),
          ApiResponse({ status: 200, description: 'Producto eliminado exitosamente.' }),
          ApiResponse({ status: 400, description: 'Error al eliminar el producto.' })
    )
}

export function GetProductByIdSwagger(){
    return applyDecorators(
        ApiOperation({
            summary: 'Busca un producto por ID',
            description: 'Busca un producto por su ID',
        }),
        ApiResponse({ status: 200, description: 'Producto encontrado.' }),
        ApiResponse({ status: 400, description: 'Producto no encontrado.' })
    )
}
