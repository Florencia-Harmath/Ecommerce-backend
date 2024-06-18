/* eslint-disable prettier/prettier */
import { OrderDetails } from "../orderDetails/orderDetails.entity";
import { User } from "../users/users.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity({name: 'orders'})
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @ManyToOne(() => User, user => user.orders, { onDelete: 'SET NULL' })
    @JoinColumn()
    user: User;

    @Column('date')
    date: string;

    @OneToOne(() => OrderDetails, orderDetail => orderDetail.order)
    orderDetails: OrderDetails;
}


