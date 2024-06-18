/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  HttpCode,
  HttpStatus,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO, LogginUserDTO } from '../users/users.dto';
import { ApiTags } from '@nestjs/swagger';
import { SignInSwagger, SignUpSwagger } from './swagger.decorator';
// import { LowerCaseInterceptor } from 'src/interceptor/lowerCaseInterceptor';

@ApiTags('AUTH')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @SignUpSwagger()
  // @UseInterceptors(LowerCaseInterceptor)
  @UsePipes(new ValidationPipe({ transform: true }))
  async signUp(@Body() user: CreateUserDTO): Promise<Object> {
    return await this.authService.signUp(user);
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @SignInSwagger()
  async signIn(@Body() credentials: LogginUserDTO): Promise<Object> {
    return await this.authService.signIn(credentials);
  }
}
