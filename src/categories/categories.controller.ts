/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './categories.service';
import { ApiTags } from '@nestjs/swagger';
import { CategoryDto } from './categories.dto';
import { Roles } from '../roles/roles.decorator';
import { Role } from '../roles/roles.enum';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../roles/roles.guard';
import {
  CreateCategorySwagger,
  GetAllCategoriesSwagger,
  GetCategoryById,
} from './swagger.decorator';
import { Category } from './categories.entity';

@ApiTags('CATEGORIES')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @GetAllCategoriesSwagger()
  async getAllCategories(): Promise<Category[]> {
    return await this.categoryService.getAllCategories();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @CreateCategorySwagger()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  async createCategory(@Body() category: CategoryDto): Promise<Object> {
    return await this.categoryService.createCategory(category);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @GetCategoryById()
  async getCategoryById(@Param('id', ParseUUIDPipe) id: string): Promise<Category> {
    return await this.categoryService.getCategoryById(id);
  }
}
