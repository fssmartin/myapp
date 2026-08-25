import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Subject } from 'rxjs';

/**
 * Servicio con Subject para comunicación más confiable
 */
@Injectable({ providedIn: 'root' })
export class InfobarService {
  
  private sidenav: MatSidenav | null = null;
  
  // Subject para comunicación reactiva (más seguro que null)
  private toggleSubject = new Subject<void>();

  registerSidenav(sidenav: MatSidenav): void {
    console.log("🔵 registerSidenav() - Sidenav registrado");
    this.sidenav = sidenav;
    
    // Suscribirse a los toggles cuando se registra
    this.toggleSubject.subscribe(() => {
      if (this.sidenav) {
        console.log("✅ Ejecutando toggle");
        this.sidenav.toggle();
      }
    });
  }

  toggle(): void {
    console.log("🟢 toggle() - Emitiendo toggle");
    this.toggleSubject.next();  // Emite el evento
  }

  open(): void {
    if (this.sidenav) {
      this.sidenav.open();
    }
  }

  close(): void {
    if (this.sidenav) {
      this.sidenav.close();
    }
  }
}