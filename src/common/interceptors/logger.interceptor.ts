/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
    CallHandler,
    ExecutionContext,
    Injectable,
    Logger,
    NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
    private readonly logger = new Logger('HTTP');
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest<Request>();
        const response = context.switchToHttp().getResponse<Response>();
        const requestId = (request.header('x-request-id') ||
            uuidv4()) as string;
        const startTime = Date.now();
        response.on('finish', () => {
            const { method, originalUrl } = request;
            const { statusCode, statusMessage } = response;
            const endTime = Date.now();
            const duration = endTime - startTime;
            const message = `${requestId} ${method} ${originalUrl} ${statusCode} ${statusMessage} ${duration}ms`;
            if (statusCode >= 500) return this.logger.error(message);
            if (statusCode >= 300) return this.logger.warn(message);
            this.logger.log(message);
        });
        return next.handle();
    }
}
