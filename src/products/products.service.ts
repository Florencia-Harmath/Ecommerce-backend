/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { ProductsDto, updateProductDTO } from './products.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async getAllProducts(page: number, limit: number): Promise<Object> {
    return await this.productsRepository.getAllProducts(page, limit);
  }

  async resetProducts(): Promise<String>{
    return await this.productsRepository.resetProducts();
  }
  
  async getProductById(id: string): Promise<Object>{
    return await this.productsRepository.getProductById(id)
  }

  async createProduct(product: ProductsDto): Promise<Object>{
    return await this.productsRepository.createProduct(product)
  }

 async updateProduct(id: string, product: updateProductDTO): Promise<Object>{
    return await this.productsRepository.updateProduct(id, product)
  }

  async deleteProduct(id: string): Promise<String>{
    return await this.productsRepository.deleteProduct(id)
  }
}
