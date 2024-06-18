/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class MinSizeValidatorPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        const minSize= 10000;
        if (value.size < minSize){
            throw new BadRequestException ('El tamaño de la imagen es muy pequeño.')
        }
        return value
    }
}