import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResBodyHandleInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map(data => {
      // const access_token = data.access_token;
      // const detail = data.detail;
      const { detail, access_token } = data || {};
      if (data !== null) {
        delete data.detail;
        delete data.access_token;
      }
      return {
        statusCode: 200,
        data,
        access_token,
        detail,
      };
    }));
  }
}
