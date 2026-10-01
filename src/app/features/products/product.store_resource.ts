// product.store.ts
import { resource, Injectable, inject, effect } from '@angular/core';
import { ProductService } from './product.service';
import { LoadingService } from '../../core/services/loading.service';

@Injectable({ providedIn: 'root' })
export class ProductResourceStore {

  private productService = inject(ProductService);
  public loadingService = inject(LoadingService);


  constructor() {
    // 🔍 Monitorear cambios del resource
    // uso el effect para poder llamar al LOADING GENERICO GLOBAL !
    // OJO CON LA CACHE , que una vez q carge la 1º ya no salta
    effect(() => {
      console.log("--------------- salta EFFECT")
      if (this.products.isLoading()) {
        this.loadingService.show();  // Mostrar cuando carga
      } else {
        this.loadingService.hide();  // Ocultar cuando termina
      }
    });
  }

  // ✨ Resource: carga automáticamente, maneja loading y error
  // IMPORTANTE TIENE CACHE.. solo se ejecuta la 1º q entra
  readonly products = resource({
    loader: async () => {
      try {
        console.log("-----------------------------------------------------------------")
        const data = await this.productService.getAllProducts().toPromise();
        return data || [];
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
  });

  reload(): void {
    this.products.reload();  // Para recargar manualmente
  }
}



/*
resource() devuelve un OBJETO con 3 propiedades:
 
products = {
  value: () => Product[],        // ← El dato (lo que cargaste)
  isLoading: () => boolean,      // ← Si está cargando
  error: () => string | null     // ← Si hubo error
}

*/