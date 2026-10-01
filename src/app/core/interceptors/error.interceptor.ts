import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { catchError, throwError } from "rxjs";

import { ERROR_MESSAGE } from '../http/http-context.tokens';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  const customMessage = req.context.get(ERROR_MESSAGE);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {

      let message = `❌ ${customMessage}. Error inesperado`;

      if (err.status === 0) {
        message = `❌ ${customMessage}. Comprueba tu conexión.`;
      }

      return throwError(() => new Error(message));
    })
  );
};