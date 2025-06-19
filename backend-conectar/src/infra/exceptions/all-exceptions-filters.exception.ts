import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const error =
      exception instanceof HttpException
        ? exception.getResponse()
        : { message: 'Internal server error' };

    const message =
      typeof error === 'string'
        ? error
        : (error as any).message || 'Unexpected error';

    const errorType =
      typeof error === 'object' && (error as any).error
        ? (error as any).error
        : HttpStatus[status];

    response.status(status).json({
      statusCode: status,
      message,
      error: errorType,
      path: request.url,
      method: request.method,
      timestamp: new Date().toISOString(),
    });
  }
}
