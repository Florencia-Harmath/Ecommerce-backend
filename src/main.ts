/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './middlewares/logger';
import { ValidationPipe, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { LowerCaseInterceptor } from './interceptor/lowerCaseInterceptor';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  try {
    const app = await NestFactory.create(AppModule);
    app.use(new LoggerMiddleware().use);
    app.useGlobalInterceptors(new LowerCaseInterceptor());
    app.useGlobalPipes(new ValidationPipe());
    const swaggerConfig = new DocumentBuilder()
      .setTitle('Documentación API ECOMMERCE')
      .setDescription(
        'En esta documentación se describe el uso de la API de ecommerce, hecho con NestJS, TypeScript, TypeORM y PostgreSQL. \n- La precarga de productos y de categorías se hace de forma automática al iniciar el servidor. \n- Los usuarios no autenticados tienen acceso a las rutas públicas, como obtener todos los productos, las categorias y filtrarlas por ID. \n- También van a poder registrarse, llenando el formulatrio de registro signUp, e iniciar sesión con signIn. \n- Los usuarios autenticados van a tener por defecto el rol de "user" y un token válido por una hora para ingresar a ciertas rutas privadas, como acceder a su información personal, editarla o eliminar su cuenta y, realizar y eliminar órdenes de compra. \n- Los usuarios rgistrados con el rol de "admin" van a poder realizar todas las acciones de los "users" y también, crear, modificar o eliminar productos, y acceder al listado de todos los usuarios y el listado de todas las ordenes de compra.',
      )
      .setContact("Florencia Harmath", "https://github.com/Florencia-Harmath", "florharmath04@gmail.com")
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api', app, document);

    await app.listen(3000);
    logger.log('Application is running on: http://localhost:3000');
  } catch (error) {
    logger.error('Error starting the application', error);
  }
}

bootstrap();
