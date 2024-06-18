/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsDto, updateProductDTO } from './products.dto';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../roles/roles.guard';
import { Roles } from '../roles/roles.decorator';
import { Role } from '../roles/roles.enum';
import {
  ApiTags
} from '@nestjs/swagger';
import {
  CreateProductSwagger,
  DeleteProductSwagger,
  GetAllProductsSwagger,
  GetProductByIdSwagger,
  ResetProductsSwagger,
  UpdateProductSwagger,
} from './swagger.decorator';

@ApiTags('PRODUCTS')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @GetAllProductsSwagger()
  async getAllProducts(
    @Query('limit') limit: string = '5',
    @Query('page') page: string = '1',
  ): Promise<Object> {
    const limitNumber = Number(limit);
    const pageNumber = Number(page);
    return await this.productsService.getAllProducts(
      pageNumber,
      limitNumber,
    )
  }

  @Post('reset')
  @HttpCode(HttpStatus.OK)
  @ResetProductsSwagger()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  async resetProducts(): Promise<String> {
    return await this.productsService.resetProducts();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @CreateProductSwagger()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  async createProduct(@Body() product: ProductsDto): Promise<Object> {
    return await this.productsService.createProduct(product);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @UpdateProductSwagger()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  async updateProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() product: updateProductDTO,
  ): Promise<Object> {
    return await this.productsService.updateProduct(id, product);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @DeleteProductSwagger()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  async deleteProduct(@Param('id', ParseUUIDPipe) id: string): Promise<String> {
    return await this.productsService.deleteProduct(id);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @GetProductByIdSwagger()
  async getProductById(@Param('id', ParseUUIDPipe) id: string): Promise<Object> {
    return await this.productsService.getProductById(id);
  }
}
