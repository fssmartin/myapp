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
  private productService = inject(ProductService);
  private loadingService = inject(LoadingService);

  readonly isLoading = this.loadingService.isLoading;  
  
  constructor() { 
    console.log('➡️ -------  CONSTRUCTOR STORE  ---------');
    //console.log('✅ llamo a getAllProducts SERVICE recuperar DATA  ');
    //this.getProducts(); 
  }
    
  private setProducts(product: Product[]): void {
    this._state.set(product);
  }

  load(): void {
    
    this.loadingService.show();
    
    this.productService.getAllProducts()
    .pipe(
      // delay(AUTH_CONSTANTS.API_DELAY_MS),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (data) => {
        this._state.set(data);
        this.loadingService.hide();
        console.log('✅ -------  STORE data mapeado  ---------', data);
      },
      error: (err) => {
        this.loadingService.hide();
        this._error.set(err.message);
      }
    });
  } 


}











