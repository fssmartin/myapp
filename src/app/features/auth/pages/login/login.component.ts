import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AuthStore } from '../../auth.store';
import { AuthCardComponent } from '../../components/auth-card/auth-card.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    AuthCardComponent,
    MatIconModule
],
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  readonly authStore = inject(AuthStore);

  errorMessage = '';
  username = '';
  password = '';

  login(): void { 

    this.errorMessage = '';

    if (!this.username.trim() || !this.password.trim()) {
      this.errorMessage = 'Debe indicar usuario y contraseña';
      return;
    } 

    this.authStore.login(this.username,this.password);
  }
 
}