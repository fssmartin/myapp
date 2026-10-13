import { Component, ElementRef, inject, input, signal, viewChild } from '@angular/core';
import { ProductStore } from '../../../product.store';

@Component({
  selector: 'app-dashboard-card',
  standalone: true,
  templateUrl: './dashboard-card.component.html',
  styleUrl: './dashboard-card.component.scss'
})
export class DashboardCardComponent {

  flipped = signal(false);

  pageLayout = viewChild<ElementRef<HTMLDivElement>>('pageLayout');

  private productStore= inject(ProductStore);

  flip(): void {
    this.flipped.update(value => !value);
  }

  // tiene que ser aqui pq YA esta renderizado para el scroll
  ngAfterViewInit() {

    // const element = this.pageLayout()?.nativeElement;

    // if (!element) return;
    
    // element.addEventListener('scroll', () => {

    //   const isBottom = element.scrollTop + element.clientHeight >= element.scrollHeight - 500;
    //   console.log("---------- isBottom ",isBottom )
      
    //     if (isBottom) {
    //       this.productStore.load();
    //     }
    
    // });
  }

}