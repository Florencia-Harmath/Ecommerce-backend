/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './products.entity';
import { Repository } from 'typeorm';
import { Category } from '../categories/categories.entity';
import { products } from '../utiles/products';
import { ProductsDto, updateProductDTO } from './products.dto';
import { Order } from '../orders/orders.entity';

@Injectable()
export class ProductsRepository implements OnModuleInit {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async onModuleInit() {
    await this.seedProducts();
  }

  async seedProducts() {
    try {
      const existingProducts = await this.productsRepository.find();

      if (existingProducts.length > 0) {
        return 'Ya hay productos en la base de datos.';
      }

      for (const product of products) {
        let category = await this.categoryRepository.findOne({
          where: { name: product.category },
        });

        if (!category) {
          category = this.categoryRepository.create({name: product.category});
          await this.categoryRepository.save(category);
        }

        await this.productsRepository.save({
          ...product,
          category: category,
        });
      }
     return 'Productos cargados correctamente.';
     
    } catch (error) {
      console.error('Error en seedProducts:', error);
      throw new BadRequestException(`Error al cargar los productos: ${error.message}`);
    }
  }

  async resetProducts(): Promise<String> {
    try {
      const productsInOrders = await this.orderRepository.find({ relations: ['orderDetails', 'orderDetails.products'] });
      const productsWithOrders = productsInOrders.flatMap(order => order.orderDetails?.products ?? []);

      if (productsWithOrders.length > 0) {
        return 'No se puede reiniciar los datos. Hay productos que ya forman parte de órdenes activas.';
      }

      await this.productsRepository.clear();
      await this.seedProducts();

      return 'Productos reiniciados correctamente.';
    } catch (error) {
      throw new NotFoundException(`Error al reiniciar los productos: ${error.message}`);
    }
  }

  async getAllProducts(page: number, limit: number): Promise<Object> {
    try {
      const [products] = await this.productsRepository.findAndCount({
        skip: (page - 1) * limit,
        take: limit,
        relations: { category: true },
      });

      return {mesage: 'productos obtenidos correctamente', products};

    } catch (error) {
      console.error('Error al obtener los productos:', error);
      throw new NotFoundException('Error al obtener los productos.');
    }
  }

  async getProductById(id: string): Promise<Object> {
    const product = await this.productsRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException('producto no encontrado.');
    }
    return {message: 'Producto conseguido correctamente:', product};
  }

  async createProduct(productDto: ProductsDto): Promise<Object> {
    let category = await this.categoryRepository.findOne({
      where: { name: productDto.category },
    });

    if (!category) {
      throw new NotFoundException ('Categoria inexistente, por favor corroborar que exista o crear una');
    }

    const product = this.productsRepository.create({ ...productDto, category });
    await this.productsRepository.save(product);

    return {message: 'Producto creado correctamente', product};
  }

  async updateProduct(id: string, product: updateProductDTO): Promise<Object> {
    const productToUpdate = await this.productsRepository.findOne({
      where: { id },
    });
    if (productToUpdate) {
      Object.assign(productToUpdate, product);
      await this.productsRepository.save(productToUpdate);
      return {message: 'Producto actualizado correctamente.', productToUpdate};
    }
    throw new NotFoundException(`El producto con ID ${id} no existe.`);
  }

  async deleteProduct(id: string): Promise<String> {
    const productToDelete = await this.productsRepository.findOne({
      where: { id },
    });
    if (productToDelete) {
      await this.productsRepository.remove(productToDelete);
      return 'Producto eliminado correctamente.';
    }
    throw new NotFoundException(`El producto no existe.`);
  }
}
