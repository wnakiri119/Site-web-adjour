import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthenticationService} from "../services/authentication/authentication.service";
import {AUTHENTICATION} from "../_api_config/route-api";

@Injectable({
  providedIn: 'root'
})
export class JWTInterceptorService implements HttpInterceptor{

  constructor(private authService: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.jwt;
    const isApiUrl = request.url.startsWith(AUTHENTICATION);
    if (token && !isApiUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: `adjour_tech ${token}`
        }
      });
    }

    return next.handle(request);
  }
}
