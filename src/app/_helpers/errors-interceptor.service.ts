import { Injectable } from '@angular/core';
import {AuthentificationService} from '../_service/authentification/authentification.service';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ErrorsInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthentificationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(err => {
      if (err.status === 401) {
        this.authService.logOut();
        location.reload(true);
      }
      const error = {
        status: err.status || err.statusText,
        message: err.message
      };
      return throwError(error);
    }));
  }
}
