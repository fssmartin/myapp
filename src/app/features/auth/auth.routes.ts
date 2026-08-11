import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './auth-layout.component';
import { loggedGuard } from '../../core/guards/auth.guard';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./pages/login/login.component')
            .then(c => c.LoginComponent)
      },
      {
        path: 'create',
        loadComponent: () =>
          import('./pages/create/create.component')
            .then(c => c.CreateComponent)
      },
      {
        path: 'profile',
        canActivate: [loggedGuard], // ✅ evita cargar si no estas logado
        loadComponent: () =>
          import('./pages/profile/profile.component')
            .then(c => c.ProfileComponent)
      },
    ]
  }
];