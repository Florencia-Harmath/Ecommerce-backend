/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductsController } from "./products.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "../categories/categories.entity";
import { Product } from "./products.entity";
import { ProductsRepository } from "./products.repository";
import { CategoryService } from "../categories/categories.service";
import { CategoryModule } from "../categories/categories.module";
import { Order } from "../orders/orders.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Product, Category, Order]), CategoryModule],
    controllers: [ProductsController],
    providers: [ProductsService, ProductsRepository, CategoryService],
    exports: [ProductsService]
})

export class ProductsModule { }