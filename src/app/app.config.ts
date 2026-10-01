import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';

 
export const appConfig: ApplicationConfig = {
  providers: [
    
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    // usa las peticiones xhr peticiones tradicionales 
    provideHttpClient(
      withFetch(), // ← Usa Fetch API (moderno)
      withInterceptors([
        authInterceptor,
        errorInterceptor
      ])
    )    
  ]
}; 
/*
Ventajas de añadir withFetch():
✅ Fetch API es estándar moderno del navegador
✅ Mejor rendimiento en ciertos casos
✅ Mejor integración con características nuevas (streams, AbortController, etc.)
✅ XMLHttpRequest quedará obsoleto en el futuro
*/
