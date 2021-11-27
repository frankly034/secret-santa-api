import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const status = exception.getStatus();
    const message = exception.getResponse();

    let errorObj = {};
    if (typeof message === 'string') {
      errorObj = { statusCode: status, message: [message], error: message,  };
    } else {
      errorObj = { ...message };
    }
    response.status(status).json({ ...errorObj });
  }
}
