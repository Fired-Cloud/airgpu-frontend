import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { AuthService } from "./auth.service";
import { Observable, throwError } from "rxjs";
import { mergeMap, catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class InterceptorService implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // don't send authorization header to untrusted endpoints
    if (
      (!req.url.startsWith(environment.backend.apiBaseUrl) &&
      !req.url.startsWith(environment.backend.stackprintBaseUrl))
      || (req.url === `${environment.backend.apiBaseUrl}/accounts` && req.method === 'POST')
    ) {
      return next.handle(req);
    }

    return this.auth.getTokenSilently$().pipe(
      mergeMap((token) => {
        const tokenReq = req.clone({
          setHeaders: { Authorization: `Bearer ${token}` },
        });
        return next.handle(tokenReq);
      }),
      catchError((err) => throwError(err))
    );
  }
}
