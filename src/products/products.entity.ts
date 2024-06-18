/* eslint-disable prettier/prettier */
import { Category } from '../categories/categories.entity';
import { OrderDetails } from '../orderDetails/orderDetails.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ length: 50, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @Column({ type: 'int', nullable: false })
  stock: number;

  @Column({ type: 'text', default: 'img-default-url.jpge', nullable: true })
  imgUrl: string;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category | Category['id'];

  @ManyToMany(() => OrderDetails, (orderDetails) => orderDetails.products, {onDelete: 'CASCADE'})
  @JoinTable()
  orderDetails: OrderDetails[];
}
