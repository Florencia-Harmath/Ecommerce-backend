/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CloudinaryRepository } from './cloudinary.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../products/products.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CloudinaryService {
  constructor(
    private readonly cloudinaryReposiotry: CloudinaryRepository,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async uploadProductImage(id: string, file: Express.Multer.File): Promise<Object> {
    const product = await this.productRepository.findOneBy({ id: id });
    if (!product) throw new NotFoundException('Producto no encontrado.');

    const uploadImage = await this.cloudinaryReposiotry.uploadProductImage(file);

    await this.productRepository.update(id, { imgUrl: uploadImage.secure_url });

    return {message: 'Imagen del producto actualizada correctamente.', product};
  }
}
