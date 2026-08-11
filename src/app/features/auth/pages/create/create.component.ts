import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AuthStore } from '../../auth.store';
import { AuthCardComponent } from '../../components/auth-card/auth-card.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    AuthCardComponent,
    MatIconModule
],
  
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {

  readonly authStore = inject(AuthStore);

  errorMessage = '';
  username = '';
  usernick = '';
  password = '';

  create(): void { 

    this.errorMessage = '';

    if (!this.username.trim() || !this.password.trim()) {
      this.errorMessage = 'Debe indicar usuario y contraseña';
      return;
    } 

    //this.authStore.create(this.username,this.password);
  }
 
}