import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Validator} from "../models/validation";

@Injectable()
export class ValidationInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(request.body instanceof Validator){
      let req = request.clone({body: request.body.asPayload()});
      return next.handle(req);
    }else{
      return next.handle(request);
    }
  }
}
