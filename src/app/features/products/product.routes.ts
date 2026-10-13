import { Routes } from '@angular/router';
import { ProductLayoutComponent } from './product-layout.component';

export const PRODUCT_ROUTES: Routes = [
  {
    path: '',
    component: ProductLayoutComponent,
    children: [
      {
        path: 'simple',
        loadComponent: () =>
          import('./pages/dashboard/dashboard.component')
            .then(c => c.DashboardComponent)
      },
      {
        path: 'resource',
        loadComponent: () =>
          import('./pages/dashboard-resource/dashboard-resource.component')
            .then(c => c.DashboardResourceComponent)
      }
    ]
  }
];