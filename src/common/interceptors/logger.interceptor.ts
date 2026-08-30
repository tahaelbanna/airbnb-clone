/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
    CallHandler,
    ExecutionContext,
    Injectable,
    Logger,
    NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
    private readonly logger = new Logger('HTTP');

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest<Request>();
        const response = context.switchToHttp().getResponse<Response>();
        const requestId = request.header('x-request-id') || uuidv4();
        const startTime = Date.now();

        const { method, originalUrl } = request;

        return next.handle().pipe(
            tap({
                next: () => {
                    const statusCode = response.statusCode;
                    const statusMessage = response.statusMessage || 'OK';
                    const duration = Date.now() - startTime;
                    const message = `${requestId} ${method} ${originalUrl} ${statusCode} ${statusMessage} ${duration}ms`;

                    if (statusCode >= 500) return this.logger.error(message);
                    if (statusCode >= 300) return this.logger.warn(message);
                    this.logger.log(message);
                },
                error: (err) => {
                    const statusCode = err?.status || 500;
                    const duration = Date.now() - startTime;
                    const message = `${requestId} ${method} ${originalUrl} ${statusCode} ${err.message || 'Error'} ${duration}ms`;

                    if (statusCode >= 500) return this.logger.error(message);
                    this.logger.warn(message);
                },
            }),
        );
    }
}
