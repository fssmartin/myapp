import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';

import { ProductStore } from '../../product.store';
import { AuthStore } from '../../../auth/auth.store';
import { DashboardCardComponent } from '../../../dashboard/components/dashboard-card/dashboard-card.component';
import { Breadcrumb } from '../../../../layout/breadcrumb/breadcrumb.component';
import { InfoUserActivityComponent } from '../../../../shared/components/info-user-activity/info-user-activity';
import { ProductListComponent } from '../../components/product-list/product-list.component';
import { MessageErrorComponent } from '../../../../shared/components/message-error/message-error';
import { ProductSearchComponent } from '../../components/product-search/product-search.component';
import { ProductListSearchedComponent } from '../../components/product-list-searched/product-list-searched.component';

@Component({
  selector: 'app-dashboard',
  imports: [DashboardCardComponent, Breadcrumb, InfoUserActivityComponent, ProductListComponent, ProductSearchComponent, MessageErrorComponent, ProductListSearchedComponent],
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

    productSearh(text: string): void {
      if(text){
        this.productStore.search(text);  // ← Carga explícita      
      }else{
        this.productStore.load();  // ← Carga explícita      
      }
    } 

}
