import { Routes } from '@angular/router';
import { MainLayout } from './layout/main-layout/main-layout.component';
import { NotFoundComponent } from './features/public/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/dashboard/dashboard.component').then(c => c.DashboardComponent)
      },
      {
        path:'auth',
        loadChildren:() => 
          import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES),
      },       
      {
        path: 'products',
        loadComponent: () =>
          import('./features/products/products.component').then(c => c.ProductsComponent)
      },
      {    
          path: '**',
          component: NotFoundComponent
      }      
    ]
  }
];