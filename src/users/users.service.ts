/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { CreateUserDTO, UpdateUserDTO } from "./users.dto";
import { User } from "./users.entity";

@Injectable()
export class UsersService {
  
  constructor(
    private readonly usersRepository : UsersRepository
  ){}

  async getUsers(pageNumber: number, limitNumber: number): Promise<User[]>{
    return await this.usersRepository.getUsers(pageNumber, limitNumber)
  }

  async createUsers(user: CreateUserDTO){
    return await this.usersRepository.createUsers(user)
  }

  async deleteUsers(id: string): Promise<Object>{
    return await this.usersRepository.deleteUsers(id)
  }

  async updateUsers(id: string, user: UpdateUserDTO): Promise<Object> {
    return await this.usersRepository.updateUsers(id, user)
  }

  async getUserById(id: string): Promise<User>{
    return await this.usersRepository.getUserById(id)
  }
}