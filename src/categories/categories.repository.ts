/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './categories.entity';
import { Repository } from 'typeorm';
import { CategoryDto } from './categories.dto';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}
  async getAllCategories(): Promise<Category[]> {
    const categories = await this.categoryRepository.find({
      relations: { products: true },
    });
    if (!categories) {
      throw new NotFoundException('¡Aun no hay categorías!');
    }
    return categories;
  }

  async getCategoryById(id: string): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: { products: true },
    });
    if (!category) {
      throw new NotFoundException(`Categoria inexistente.`);
    }

    return category;
  }

  async createCategory(category: CategoryDto): Promise<Object> {
    const existingCategory = await this.categoryRepository.findOne({
      where: { name: category.name },
    });
    if (existingCategory) return 'La categoria ya existe';
    const newCategory = this.categoryRepository.create(category);
    await this.categoryRepository.save(newCategory);
    return { message: 'categoria creada exitosamente', newCategory };
  }
}
