/* eslint-disable prettier/prettier */
import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
class LoggerMiddleware implements NestMiddleware{
    use(req: Request, res: Response, next: NextFunction) {
        const { method, originalUrl } = req;
        const timeStamp = new Date().toLocaleTimeString();
        console.log(`Hora: [${timeStamp}], método: ${method}, url: ${originalUrl}`);
        next();
    }
}

export { LoggerMiddleware };