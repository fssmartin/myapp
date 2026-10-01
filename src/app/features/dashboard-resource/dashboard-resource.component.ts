import { Component, inject, signal } from '@angular/core';
import { AuthStore } from '../auth/auth.store';
import { Breadcrumb } from '../../layout/breadcrumb/breadcrumb.component';
import { InfoUserActivityComponent } from '../../shared/components/info-user-activity/info-user-activity';
import { ProductListComponent } from '../products/components/product-list/product-list.component';
import { MessageErrorComponent } from '../../shared/components/message-error/message-error';
import { ProductResourceStore } from '../products/product.store_resource';

@Component({
  selector: 'app-dashboard',
  imports: [Breadcrumb, InfoUserActivityComponent, ProductListComponent, MessageErrorComponent],
  templateUrl: './dashboard-resource.component.html',
  styleUrl: './dashboard-resource.component.scss',
})
export class DashboardComponent {

    remainingTime = signal(''); 

    ProductResourceStore = inject(ProductResourceStore); 

    ngOnInit(): void {
//      this.ProductResourceStore.load();  // ← Carga explícita
    }

}
