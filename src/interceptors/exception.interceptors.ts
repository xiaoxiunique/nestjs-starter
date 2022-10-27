import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();
    // const request = ctx.getRequest()
    this.logger.error(
      `request：${req.path}[${exception.getStatus()}]: ${exception.message}`,
    );

    //拦截异常
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (exception.status === HttpStatus.NOT_FOUND) {
      res.status(exception.getStatus()).json({ message: 'koa.NotFound' });
      return;
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (exception.status === HttpStatus.BAD_REQUEST) {
      if (typeof Object(exception.getResponse()).message === 'string') {
        res.status(exception.getStatus()).json({
          message:
            Object(exception.getResponse()).message || 'BadRequestException',
        });
      } else {
        res.status(exception.getStatus()).json({
          message:
            Object(exception.getResponse()).message[0] || 'BadRequestException',
        });
      }
      return;
    }
    res.status(exception.getStatus()).json({ message: exception.message });
  }
}
