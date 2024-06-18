/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/users.entity';
import { Order } from './orders.entity';
import { OrderDetails } from '../orderDetails/orderDetails.entity';
import { Product } from '../products/products.entity';
import { CreateOrderDto } from './orders.dto';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(OrderDetails)
    private readonly orderDetailsRepository: Repository<OrderDetails>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async addOrder(data: CreateOrderDto): Promise<Object> {
    const user = await this.userRepository.findOne({
      where: { id: data.userId },
    });
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${data.userId} no existe.`);
    }
  
    const newOrderDetails = [];
    let totalPrice = 0;
  
    for (const product of data.products) {
      const productData = await this.productRepository.findOne({
        where: { id: product.id },
      });
  
      if (!productData) {
        throw new NotFoundException(
          `Producto con ID ${product.id} no encontrado.`,
        );
      }
  
      if (productData.stock < 1) {
        throw new NotFoundException(
          `Producto con ID ${product.id} no tiene suficiente stock disponible.`,
        );
      }
  
      productData.stock -= 1;
  
      await this.productRepository.save(productData);
  
      totalPrice += Number(productData.price);
  
      newOrderDetails.push(productData);
    }
  
    const newOrderDetail = this.orderDetailsRepository.create({
      price: totalPrice,
      products: newOrderDetails,
    });
    await this.orderDetailsRepository.save(newOrderDetail);

    const newOrder = this.orderRepository.create({
      date: new Date().toISOString(),
      user: user,
      orderDetails: newOrderDetail,
    });
    await this.orderRepository.save(newOrder);
  
    return {
      message: 'Orden creada correctamente',
      userId: data.userId,
      orderId: newOrder.id,
      totalPrice: totalPrice,
      orderDetails: newOrderDetails.map(detail => ({
        id: detail.id,
        products: newOrderDetail.products,
      })),
    };
  }
  

  async getAllOrders(): Promise<Object> {
    try {
      const orders = await this.orderRepository.find({
        relations: ['user', 'orderDetails', 'orderDetails.products'],
      });

      if (!orders || orders.length === 0) {
        throw new NotFoundException('¡Aun no hay órdenes de compra!');
      }

      const filteredOrders = orders.map((order) => {
        if (order.user) {
          const { password, ...userWithoutPassword } = order.user;
          return {
            ...order,
            user: userWithoutPassword,
          };
        } else {
          return {
            ...order,
            user: null,
          };
        }
      });

      return { message: 'Ordenes obtenidas correctamente', filteredOrders };
    } catch (error) {
      throw new NotFoundException(
        `Error al obtener las órdenes: ${error.message}`,
      );
    }
  }

  async getOrderById(id: string): Promise<Object> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['user', 'orderDetails', 'orderDetails.products'],
    });

    if (!order) {
      throw new NotFoundException(`La orden no fue encontrada!`);
    }

    let userWithoutPassword = null;
    if (order.user) {
      const { password, ...user } = order.user;
      userWithoutPassword = user;
    }

    return {
      message: 'Orden obtenida correctamente',
      orderId: order.id,
      date: order.date,
      user: userWithoutPassword,
      orderDetails: {
        id: order.orderDetails.id,
        price: order.orderDetails.price,
        products: order.orderDetails.products,
      },
    };
  }
}
