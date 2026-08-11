import { inject } from '@angular/core';
import { CanActivateFn,  Router } from '@angular/router';
import { AuthStore } from '../../features/auth/auth.store';

export const adminGuard: CanActivateFn = () => {
  const authStore = inject(AuthStore);
  const router = inject(Router);

  console.log("----- adminGuard: CanActivateFn")
 
  // console.log("IS ADMIN ? CanActivateFn adminGuard -- " , authService.isAdmin())
  // tengo que preguntar por la signal en authStore.. no en service

  return authStore.isLogged()
      ? true
      : router.createUrlTree(['/home']); 
};

export const loggedGuard: CanActivateFn = () => {
    const authStore = inject(AuthStore);
    const router = inject(Router);
    
    console.log("----- loggedGuard: CanActivateFn loged ? ",authStore.isLogged())
    if (authStore.isLogged()) {
      return true;
    }

    // ❌ no esta logado → redirigir
    router.navigate(['/home']);
    return false;
};


