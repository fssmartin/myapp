import { Component, inject, signal } from '@angular/core';
import { AuthStore } from '../auth/auth.store';
import { ProductStore } from '../products/product.store';
import { Breadcrumb } from '../../layout/breadcrumb/breadcrumb.component';
import { InfoUserActivityComponent } from '../../shared/components/info-user-activity/info-user-activity';
import { ProductListComponent } from '../products/components/product-list/product-list.component';
import { MessageErrorComponent } from '../../shared/components/message-error/message-error';
import { DashboardCardComponent } from './components/dashboard-card/dashboard-card.component';

@Component({
  selector: 'app-dashboard',
  imports: [DashboardCardComponent, Breadcrumb, InfoUserActivityComponent, ProductListComponent, MessageErrorComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {

    remainingTime = signal('');
    authStore = inject(AuthStore); 

    readonly breadcrumb = {
      title: 'LISTADO',
      menu: [
        { option: 'Inicio', url: '/' },
        { option: 'Listado de productos', url: '' }
      ]
    }


    productStore = inject(ProductStore); 

    ngOnInit(): void {
      this.productStore.load();  // ← Carga explícita
    }

}
