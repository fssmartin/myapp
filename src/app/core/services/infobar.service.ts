import { Injectable, signal } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
//import { Subject } from 'rxjs';

/**
 * Servicio con Subject para comunicación más confiable
 */
@Injectable({ providedIn: 'root' })
export class InfobarService {
  
  private sidenav: MatSidenav | null = null;
  // Subject para comunicación reactiva (más seguro que null)
  //private toggleSubject = new Subject<void>();


  private _isOpen = signal(false);
  readonly isOpen = this._isOpen.asReadonly();


  registerSidenav(sidenav: MatSidenav): void {
    console.log("🔵 registerSidenav() - Sidenav registrado");
    this.sidenav = sidenav;  
    
    // Suscribirse a los toggles cuando se registra
    // this.toggleSubject.subscribe(() => {
    //   if (this.sidenav) {
    //     console.log("✅ Ejecutando toggle");
    //     this.sidenav.toggle();
    //   }
    // });
  }

  toggle(): void {
    console.log("🟢 toggle() - Emitiendo toggle");
    // this.toggleSubject.next();  // Emite el evento
    this._isOpen.update(value => !value);
    if (this.sidenav) {
      this.sidenav.toggle();
    }    
  }

  open(): void {
    this._isOpen.set(true);
    if (this.sidenav) {
      this.sidenav.open();
    }
  }

  close(): void {
    this._isOpen.set(false);
    if (this.sidenav) {
      this.sidenav.close();
    }
  }
}