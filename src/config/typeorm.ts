/* eslint-disable prettier/prettier */
import { DataSource, DataSourceOptions } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';
import { registerAs } from '@nestjs/config';
import { Category } from '../categories/categories.entity';
import { Order } from '../orders/orders.entity';
import { OrderDetails } from '../orderDetails/orderDetails.entity';
import { Product } from '../products/products.entity';
import { User } from '../users/users.entity';

dotenvConfig({ path: '.development.env' });

const config: DataSourceOptions = {
  type: 'postgres',
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  synchronize: true,
  //dropSchema: true,
  logging: false,
  entities: [Category, Order, OrderDetails, Product, User],
  migrations: ['dist/src/database/migrations/*{.ts,.js}']
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
