/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './orders.entity';
import { User } from '../users/users.entity';
import { OrderDetails } from '../orderDetails/orderDetails.entity';
import { Product } from '../products/products.entity';
import { OrdersRepository } from './orders.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Order, User, OrderDetails, Product])],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
})
export class OrdersModule {}
