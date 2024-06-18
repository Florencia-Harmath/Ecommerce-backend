/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { CategoryController } from "./categories.controller";
import { CategoryService } from "./categories.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "./categories.entity";
import { CategoryRepository } from "./categories.repository";
@Module({
    imports: [TypeOrmModule.forFeature([Category])],
    controllers: [CategoryController],
    providers: [CategoryService, CategoryRepository],
    exports: [CategoryService, CategoryRepository]
})

export class CategoryModule { }