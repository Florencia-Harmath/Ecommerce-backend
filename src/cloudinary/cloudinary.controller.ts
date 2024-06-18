/* eslint-disable prettier/prettier */
import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '../auth/auth.guard';
import { ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { Role } from '../roles/roles.enum';
import { Roles } from '../roles/roles.decorator';
import { RolesGuard } from '../roles/roles.guard';
import { MinSizeValidatorPipe } from '../pipes/MinSizeValidatorPipe';
import { UploadProductImageSwagger } from './swagger.decotator';

@ApiTags('FILES')
@Controller('files')
export class CloudinaryController {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post('uploadImage/:id')
  @HttpCode(HttpStatus.CREATED)
  @UploadProductImageSwagger()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadProductImage(
    @Param('id') id: string,
    @UploadedFile(new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({
          maxSize: 200000,
          message: 'El archivo es demasiado grande.'
        }),
        new FileTypeValidator({
          fileType: /.(jpg|jpeg|png|gif|webp)$/,
        }),
      ],
    }), MinSizeValidatorPipe) file: Express.Multer.File,
  ): Promise<Object> {
    return await this.cloudinaryService.uploadProductImage(id, file);
  }
}
