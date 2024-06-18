/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { OrdersRepository } from "./orders.repository";
import { CreateOrderDto } from "./orders.dto";

@Injectable()
export class OrdersService {
    constructor (private readonly ordersRepository : OrdersRepository)  {}

    async addOrder(createOrderDto: CreateOrderDto): Promise<Object>{
        return await this.ordersRepository.addOrder(createOrderDto)
    }

    async getAllOrders(): Promise<Object>{
        return await this.ordersRepository.getAllOrders()
    }

    async getOrderById(id: string): Promise<Object>{
        return await this.ordersRepository.getOrderById(id)
    } 
}