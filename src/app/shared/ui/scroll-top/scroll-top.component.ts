import { Component, HostListener, signal } from '@angular/core';

@Component({
  selector: 'app-scroll-top',
  standalone: true,  
  styleUrl:'scroll-top.component.css',
  template:`
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
export class ScrollTopComponent {       

  isVisible = signal(false);  // Initial false

  @HostListener('window:scroll')
  onWindowScroll(): void {
    console.log("window.scrollY______, ",window.scrollY)
    this.isVisible.set( window.scrollY > 200 )
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
