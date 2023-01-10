import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LocalStorageService } from "./services/local-storage.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private token: LocalStorageService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authRequest = req;
        const token = this.token.getToken();

        if(token != null) {
            authRequest = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + token)
            });
        }
        return next.handle(authRequest);
    }
}

export const authInterceptorProviders = [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
];