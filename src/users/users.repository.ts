/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO, UpdateUserDTO } from './users.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async getUsers(pageNumber: number, limitNumber: number): Promise<User[]> {
    const [user] = await this.usersRepository.findAndCount({
      skip: (pageNumber - 1) * limitNumber,
      take: limitNumber,
      select: [
        'id',
        'email',
        'name',
        'address',
        'city',
        'country',
        'phone',
        'orders',
        'role',
      ],
      relations: { orders: true },
    });
    if (user.length === 0) {
      throw new NotFoundException('¡Aún no hay usuarios existentes!');
    }
    return user;
  }

  async createUsers(user: Partial<CreateUserDTO>) {
    const userCreated = await this.usersRepository.save(user);
    const { password, ...userWithoutPasswords } = userCreated;
    return userWithoutPasswords;
  }

  async deleteUsers(id: string): Promise<Object> {
    const userToDelete = await this.usersRepository.findOne({ where: { id } });
    if (!userToDelete) {
      throw new NotFoundException(
        `El usuario que se quiere eliminar no fue encontrado.`,
      );
    }
    await this.usersRepository.remove(userToDelete);
    return { message: 'usuario eliminado correctamente.' };
  }

  async updateUsers(id: string, user: UpdateUserDTO): Promise<Object> {
    const userToUpdate = await this.usersRepository.findOne({
      where: { id },
      select: [
        'address',
        'city',
        'country',
        'email',
        'id',
        'name',
        'orders',
        'phone',
      ],
    });
    if (userToUpdate) {
      Object.assign(userToUpdate, user);
      await this.usersRepository.save(userToUpdate);
      return { message: 'usuario actualizado correctamente.', userToUpdate };
    }
    throw new NotFoundException(
      `El usuario que se quiere modificar no fue encontrado.`,
    );
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
      select: [
        'address',
        'city',
        'country',
        'email',
        'id',
        'name',
        'orders',
        'phone',
      ],
    });
    if (!user) {
      throw new NotFoundException(`Usuario no encontrado.`);
    }
    return user;
  }

  async findByEmail(email: string) {
    return await this.usersRepository.findOneBy({
      email: email,
    });
  }
}
