import { DestroyRef, Injectable, computed, inject, signal } from '@angular/core';
 
import { Router } from '@angular/router'; 
import { ProductService } from './product.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'; 
import { Product } from './models/product.model'; 
import { LoadingService } from '../../core/services/loading.service';
import { AUTH_CONSTANTS } from '../../core/constants/auth.constants';
import { delay } from 'rxjs';
import { SkipPageService } from '../../shared/services/skip-page.service';



@Injectable({
  providedIn: 'root'
})
export class ProductStore {

  private readonly _state = signal<Product[]>([]); 
  private readonly _error = signal<string | null>(null);
  
  private readonly _searches = signal<Record<string,Product[]>>({}); 

  private readonly _prodIsLoading = signal(false);
  readonly prodIsLoading = this._prodIsLoading.asReadonly();

  /* 
  {
    'iphone':[prod1,prod2,pro3],
    'pepe':[prod4,prod4,prod4,prod4],
    'juan':[prod7,prod8,prod9],
    }
    
    */

  readonly products = this._state.asReadonly(); 
  readonly error = this._error.asReadonly();  
  
  readonly searchKeys = computed(() => Object.keys(this._searches()));


  private destroyRef = inject(DestroyRef);
  private productService = inject(ProductService);
  private loadingService = inject(LoadingService);

  private skipPageService= inject(SkipPageService);

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
    
    if(this.loadingService.isLoading() || this._prodIsLoading()) return;

    this._prodIsLoading.set(true);

    if(this.skipPageService.skip() === 0 )
    this.loadingService.show();
    
    this.productService.getAllProducts()
    .pipe(
      // delay(AUTH_CONSTANTS.API_DELAY_MS),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (data) => {
        this._state.update( (productsBefore) => [ ...productsBefore ,  ...data ]);
        this._prodIsLoading.set(false)
        this.skipPageService.nextPage();
        this.loadingService.hide();
        console.log('✅ -------  STORE data mapeado  ---------', data);
      },
      error: (err) => {
        this.loadingService.hide();
        this._error.set(err.message);
      }
    });
  } 

  search(item:string): void {

    this._error.set('');

    this.loadingService.show();
    
    this.productService.getSearch(item)
    .pipe(
      // delay(AUTH_CONSTANTS.API_DELAY_MS),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (data) => {
        // cargo los productos
        this._state.set(data);
        // cargo las keys con los productos , para cachear !! si no devuelve la busqueda no meto nada..
        if(data.length){
            this._searches.update((searches)=> ({...searches, [item+" ["+data.length+"]"] : data })    )
        }else{
          this._error.set('Sin resultados Comprueba que has escrito tu búsqueda correctamente o usa términos más generales.');
        }  
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











