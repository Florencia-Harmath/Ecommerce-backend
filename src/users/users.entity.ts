/* eslint-disable prettier/prettier */
import { Order } from "../orders/orders.entity";
import { Role } from "../roles/roles.enum";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity({name: 'users'})
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @Column({length: 50, nullable: false})
    name: string;

    @Column({length: 50, unique: true, nullable: false})
    email: string;

    @Column({type: 'enum', enum: Role, default: Role.USER})
    role: Role[];

    @Column({length: 200, nullable: false})
    password: string;

    @Column({nullable: true})
    phone: number;

    @Column({length: 50, nullable: true})
    country: string;

    @Column({nullable: true})
    address: string;

    @Column({length: 50, nullable: true})
    city: string;

    @OneToMany(() => Order, order => order.user)
    orders: Order[];
}
