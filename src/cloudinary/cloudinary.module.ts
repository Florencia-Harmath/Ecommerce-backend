/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { CloudinaryService } from "./cloudinary.service";
import { CloudinaryRepository } from "./cloudinary.repository";
import { CloudinaryConfig } from "../config/cloudinary";
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "../products/products.entity";
import { CloudinaryController } from "./cloudinary.controller";

@Module({
  imports: [
    ConfigModule, 
    TypeOrmModule.forFeature([Product]) 
  ],
  providers: [
    CloudinaryService, 
    CloudinaryRepository, 
    CloudinaryConfig 
  ],
  controllers: [CloudinaryController], 
  exports: [CloudinaryConfig] 
})
export class CloudinaryModule {}
