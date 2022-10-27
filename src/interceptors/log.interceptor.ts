import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request, Response } from 'express';

@Injectable()
export class LogInterceptor implements NestInterceptor {
  private logger = new Logger(LogInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const req = context.switchToHttp().getRequest<Request>();
    const res = context.switchToHttp().getResponse<Response>();
    return next.handle().pipe(
      tap(() => {
        this.logger.log(`request:${req.method}->${req.path}[${res.statusCode}] ... ${Date.now() - now}ms`);
        if (res.statusCode >= 400) {
          this.logger.log(
            `request:${req.method}->${req.path}[${res.statusCode}] params -> ${JSON.stringify({
              ...req.query,
              ...req.body,
              ...req.params,
            })}ms`,
          );
        }
      }),
    );
  }
}
