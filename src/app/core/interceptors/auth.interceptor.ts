import {
    HttpInterceptorFn
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthStore } from '../../features/auth/auth.store';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

//  Registrarlo
//  En app.config.ts

    const authStore = inject(AuthStore);

    const token = localStorage.getItem("token");

    const request = token
        ? req.clone({
            setHeaders:{
            Authorization:`Bearer ${token}`
            }
        })
        : req;

    return next(request).pipe(

        catchError(error => {

            if(error.status === 401){
                console.log("Token caducado o inválido");
                authStore.logout();
            }

            return throwError(() => error);

        })

    );

};