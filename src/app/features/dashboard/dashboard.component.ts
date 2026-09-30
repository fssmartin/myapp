import { Component, inject, signal } from '@angular/core';
import { AuthStore } from '../auth/auth.store';
import { ProductStore } from '../products/product.store';
import { Breadcrumb } from '../../layout/breadcrumb/breadcrumb.component';
import { InfoUserActivityComponent } from '../../shared/components/info-user-activity/info-user-activity';
import { ProductListComponent } from '../products/components/product-list/product-list.component';

@Component({
  selector: 'app-dashboard',
  imports: [Breadcrumb, InfoUserActivityComponent, ProductListComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {

    remainingTime = signal('');
    authStore = inject(AuthStore); 

    productStore = inject(ProductStore); 


}
