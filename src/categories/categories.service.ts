/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './categories.repository';
import { CategoryDto } from './categories.dto';
import { Category } from './categories.entity';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRespository: CategoryRepository) {}

  async createCategory(category: CategoryDto): Promise<Object>{
    return await this.categoryRespository.createCategory(category)
  }

  async getAllCategories(): Promise<Category[]> {
    return await this.categoryRespository.getAllCategories();
  }

 async  getCategoryById(id: string): Promise<Category>{
    return await this.categoryRespository.getCategoryById(id)
  }
}
