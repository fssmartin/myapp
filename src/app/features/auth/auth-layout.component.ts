import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="auth-layout">
      <router-outlet />
    </div>
  `,
  styleUrl: './auth-layout.component.scss'
  
})
export class AuthLayoutComponent {}