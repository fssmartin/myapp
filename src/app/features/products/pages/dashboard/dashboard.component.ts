import { AfterViewInit, Component, ElementRef, inject, signal, viewChild } from '@angular/core';

import { ProductStore } from '../../product.store';
import { AuthStore } from '../../../auth/auth.store';
import { Breadcrumb } from '../../../../layout/breadcrumb/breadcrumb.component';
import { InfoUserActivityComponent } from '../../../../shared/components/info-user-activity/info-user-activity';
import { ProductListComponent } from '../../components/product-list/product-list.component';
import { MessageErrorComponent } from '../../../../shared/components/message-error/message-error';
import { ProductSearchComponent } from '../../components/product-search/product-search.component';
import { ProductListSearchedComponent } from '../../components/product-list-searched/product-list-searched.component';

@Component({
  selector: 'app-dashboard',
  imports: [
      //DashboardCardComponent, 
      Breadcrumb, InfoUserActivityComponent, ProductListComponent, ProductSearchComponent, MessageErrorComponent, ProductListSearchedComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements AfterViewInit {

    remainingTime = signal('');
    isSearch = signal(false);
    authStore = inject(AuthStore); 

    pageLayout = viewChild<ElementRef<HTMLDivElement>>('pageLayout');
 
    readonly breadcrumb = {
      title: 'LISTADO',
      menu: [
        { option: 'Inicio', url: '/' },
        { option: 'Listado de productos', url: '' }
      ]
    }

    productStore = inject(ProductStore); 

    ngOnInit(): void {
      if(this.productStore.products().length===0)
      this.productStore.load();  // ← Carga explícita
    }

    productSearh(text: string): void {
      const element = this.pageLayout()?.nativeElement;
      if(text){
        this.isSearch.set(true)
        this.productStore.search(text);  // ← Carga explícita      
      }else{
        this.isSearch.set(false)
        this.productStore.saveScrollTop(element!.scrollTop);
        this.productStore.load();  // ← Carga explícita      
      }
    } 

        // tiene que ser aqui pq YA esta renderizado para el scroll
    ngAfterViewInit() {

        const element = this.pageLayout()?.nativeElement;

        console.log("_____this.isSearch()_______________ ",this.isSearch())

        if (!element )  return;

        const scrollTop = this.productStore.getScrollTop();

        if (scrollTop > 0) {
          setTimeout(() => {
            element.scrollTop = scrollTop;
            console.log( "_____element.scrollTop_______________ " , element.scrollTop)
          });
        }

        //element.scrollTop = 
        
        element.addEventListener('scroll', () => {

        const isBottom = element.scrollTop + element.clientHeight >= element.scrollHeight - 500;
      //  console.log("---------- isBottom ",isBottom )
        
        if (isBottom && this.isSearch() === false) {
            this.productStore.saveScrollTop(element.scrollTop);
            this.productStore.load();
        }
        
      });
    }

}
