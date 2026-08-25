import { Component, signal, inject, DestroyRef, AfterViewInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-scroll-top',
  standalone: true,  
  styleUrl: 'scroll-top.component.css',
  template: `
    @if (isVisible()) {
      <button
        class="scroll-top-btn"
        (click)="scrollToTop()"
        aria-label="Volver arriba">
        ↑
      </button>
    }
  `
})
export class ScrollTopComponent implements AfterViewInit {       

  isVisible = signal(false);
  private destroyRef = inject(DestroyRef);  // ← Inyectar aquí, en el constructor

  ngAfterViewInit(): void {
    // Esperar a que se renderice el DOM
    setTimeout(() => {
      const mainContent = document.querySelector('.main-content');
      
      if (mainContent) {
        console.log("🔵 Escuchando scroll en .main-content");
        
        fromEvent(mainContent, 'scroll')
          .pipe(
            debounceTime(100),
            map(() => (mainContent as HTMLElement).scrollTop > 200),
            takeUntilDestroyed(this.destroyRef)  // ← Ahora sí funcion
          )
          .subscribe(visible => {
            //console.log("🟢 Scroll event:", (mainContent as HTMLElement).scrollTop);
            this.isVisible.set(visible);
          });
      }
    }, 100);
  }

  scrollToTop(): void {
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
      (mainContent as HTMLElement).scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}