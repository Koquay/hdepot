import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.getUserToken();
    if(token) {
      const authReq = request.clone({setHeaders:{"Authorization":"Bearer " + token}});
      console.log('authReq', authReq)
      return next.handle(authReq);
    }
    return next.handle(request);
  }

  private getUserToken = () => {
    const hdepot = localStorage.getItem('hdepot');
    let token = null;

    if(hdepot) {
      token = JSON.parse(hdepot)?.user?.token;
    }

    return token;
  }
}

