import { applyDecorators } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

export function SignUpSwagger(){
    return applyDecorators(
        ApiOperation({
            summary: 'Registro de usuario',
            description: 'Permite registrar un nuevo usuario proporcionando los datos requeridos en el CreateUserDTO. Por defecto se le asigna como role USER, por eso no se pide al usuario que ingrese este campo.',
        }),
        ApiResponse({ status: 201, description: 'Usuario creado correctamente.' }),
        ApiResponse({ status: 400, description: 'Datos ingresados inválidos.' })
    )
}

export function SignInSwagger(){
    return applyDecorators(
        ApiOperation({
            summary: 'Inicio de sesión del usuario.',
            description: 'Permite al usuario iniciar sesión proporcionando su email y contraseña. Si las credenciales son correctas, se genera un token válido por una hora (1h). Si las credenciales son incorrectas, se devuelve un error genérico para mayor seguridad del usuario.',
        }),
        ApiResponse({ status: 200, description: 'Inicio de sesión exitoso.' }),
        ApiResponse({ status: 401, description: 'Credenciales inválidas.' })
    )
}