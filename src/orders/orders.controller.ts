/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, UseGuards } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./orders.dto";
import { AuthGuard } from "../auth/auth.guard";
import { ApiTags } from "@nestjs/swagger";
import { Roles } from "../roles/roles.decorator";
import { Role } from "../roles/roles.enum";
import { RolesGuard } from "../roles/roles.guard";
import { AddOrderSwagger, GetAllOrdersSwagger, GetOrderByIdSwagger } from "./swagger.decorator";

@ApiTags('ORDERS')
@Controller("orders")
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}
    
    @Post()
    @HttpCode(HttpStatus.CREATED)
    @AddOrderSwagger()
    @UseGuards(AuthGuard)
    async addOrder(@Body() createOrderDto: CreateOrderDto): Promise<Object> {
        return await this.ordersService.addOrder(createOrderDto);
    }
    
    @Get()
    @HttpCode(HttpStatus.OK)
    @GetAllOrdersSwagger()
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    async getAllOrders(): Promise<Object> {
        return await this.ordersService.getAllOrders();
    }
    
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @GetOrderByIdSwagger()
    @UseGuards(AuthGuard)
    async getOrderById(@Param('id', ParseUUIDPipe) id: string): Promise<Object> {
        return await this.ordersService.getOrderById(id);
    }

}
