/* eslint-disable prettier/prettier */
import { UsersService } from './users.service';
import {
  Controller,
  Get,
  Param,
  Body,
  Delete,
  Put,
  HttpCode,
  HttpStatus,
  Query,
  ParseUUIDPipe,
  UseGuards
} from '@nestjs/common';
import { CreateUserDTO, UpdateUserDTO } from './users.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from '../roles/roles.guard';
import { Roles } from '../roles/roles.decorator';
import { Role } from '../roles/roles.enum';
import { ApiTags } from '@nestjs/swagger';
import {
  DeleteUserSwagger,
  GetUserByIdSwagger,
  GetUsersSwagger,
  UpdateUserSwagger,
} from './swagger.decorator';
import { User } from './users.entity';

@ApiTags('USERS')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @GetUsersSwagger()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  async getUsers(@Query('page') page = '1', @Query('limit') limit = '5'): Promise<User[]> {
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    return await this.usersService.getUsers(pageNumber, limitNumber);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @DeleteUserSwagger()
  @UseGuards(AuthGuard)
  async deleteUsers(@Param('id', ParseUUIDPipe) id: string): Promise<Object> {
    return await this.usersService.deleteUsers(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @UpdateUserSwagger()
  @UseGuards(AuthGuard)
  async updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() user: UpdateUserDTO,
  ): Promise<Object> {
    return await this.usersService.updateUsers(id, user);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @GetUserByIdSwagger()
  @UseGuards(AuthGuard)
  async getUserById(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    return await this.usersService.getUserById(id);
  }
}
