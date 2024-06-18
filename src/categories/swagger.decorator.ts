import { applyDecorators } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse } from "@nestjs/swagger";

export function GetAllCategoriesSwagger(){
    return applyDecorators(
        ApiOperation({
            summary: 'Obtener todas las categorías.',
            description:'Obtiene todas las categorías agregadas en la pre-carga. Si se realiza después de la carga de los productos, se muestra el array de productos relacionados.',
        }),
        ApiResponse({ status: 200, description: 'Categorías obtenidas correctamente.'}),
        ApiResponse({ status: 400, description: 'Error al obtener las categorías.' })
    )
}

export function CreateCategorySwagger(){
    return applyDecorators(
        ApiBearerAuth(),
        ApiOperation({
            summary: 'Crear una nueva categoría',
            description:'Unicamente los usuarios logueados como ADMIN pueden crear una nueva categoría.',
        }),
        ApiResponse({ status: 201, description: 'Categoría creada correctamente.' }),
        ApiResponse({ status: 400, description: 'Error al crear la categoría.' })
    )
}

export function GetCategoryById(){
    return applyDecorators(
        ApiOperation({
            summary: 'Obtener categoría por ID.',
            description:'Obtiene una categoría por su ID.',
        }),
        ApiResponse({ status: 200, description: 'Categoría obtenida correctamente.' }),
        ApiResponse({ status: 400, description: 'Error al obtener la categoría.' })
    )
}

