/* eslint-disable prettier/prettier */
import { Order } from '../orders/orders.entity';
import { Product } from '../products/products.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('OrderDetails')
export class OrderDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ type: 'decimal', scale: 2, precision: 10, nullable: false })
  price: number;

  @OneToOne(() => Order, (order) => order.orderDetails, { onDelete: 'CASCADE' })
  @JoinColumn()
  order: Order;

  @ManyToMany(() => Product, (product) => product.orderDetails, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  products: Product[];
}
