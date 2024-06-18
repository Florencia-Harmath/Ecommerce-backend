/* eslint-disable prettier/prettier */
import { UsersRepository } from '../users/users.repository';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDTO, LogginUserDTO } from '../users/users.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(user: Partial<CreateUserDTO>): Promise<Object> {
    const { email, password, confirmPassword, ...userData } = user;

    if (password !== confirmPassword) {
      throw new BadRequestException('Las contraseñas deben ser iguales.');
    }

    const existingUser = await this.usersRepository.findByEmail(email);
    if (existingUser) {
      throw new BadRequestException('El usuario ya existe.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const createdUser = await this.usersRepository.createUsers({
      ...userData,
      email,
      password: hashedPassword,
    });

    return { message: 'Usuario registrado exitosamente.', createdUser };
  }

  async signIn({ email, password }: LogginUserDTO): Promise<Object> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) throw new UnauthorizedException('Credenciales inválidas.');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Credenciales inválidas.');

    const payload = { id: user.id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);

    return { message: 'Inicio de sesión exitoso.', token };
  }

}