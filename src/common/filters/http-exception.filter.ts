import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    let message = 'Une erreur est survenue';
    let error = 'Internal Server Error';

    if (typeof exceptionResponse === 'object' && 'message' in exceptionResponse) {
      if (Array.isArray(exceptionResponse.message)) {
        message = exceptionResponse.message[0];
      } else {
        message = exceptionResponse.message as string;
      }
    }

    const errorResponse = {
      success: false,
      error: message,
      timestamp: new Date().toISOString(),
    };

    response.status(status).json(errorResponse);
  }
} 