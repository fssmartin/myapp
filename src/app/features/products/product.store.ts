import { DestroyRef, Injectable, computed, inject, signal } from '@angular/core';
 
import { Router } from '@angular/router'; 
import { ProductService } from './product.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'; 
import { Product } from './models/product.model'; 
import { LoadingService } from '../../core/services/loading.service';
import { AUTH_CONSTANTS } from '../../core/constants/auth.constants';
import { delay } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ProductStore {

  private readonly _state = signal<Product[]>([]); 
  private readonly _error = signal<string | null>(null);

  readonly products = this._state.asReadonly(); 
  readonly error = this._error.asReadonly();  

  private destroyRef = inject(DestroyRef);
  
  private loadingService = inject(LoadingService);
  private productService = inject(ProductService);
  
  constructor() { 

    this.getProducts();

  }
    
  private setProducts(product: Product[]): void {
    this._state.set(product);
  }

  private getProducts(): void {
    
    this.loadingService.show();
    
    this.productService.getAllProducts()
    .pipe(
      delay(AUTH_CONSTANTS.API_DELAY_MS),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (productsResponse) => {
        this._state.set(productsResponse);
        this.loadingService.hide();
        console.log('✅ PRODUCTOS RECUPERADOS STORE !', productsResponse);
        //this.router.navigate(['/']);
      },
      error: (err) => {
        console.error(`❌ Error en getProducts`, err);
        this.loadingService.hide();
      }
    });
  } 
 

}











