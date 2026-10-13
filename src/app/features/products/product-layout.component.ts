import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-product-layout',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="product-layout">
      <router-outlet />
    </div>
  `,
  styleUrl: './product-layout.component.scss'
  
})
export class ProductLayoutComponent {
  
}