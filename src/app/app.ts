
import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router'; 
import { AuthStore } from './features/auth/auth.store';

@Component({
  selector: 'app-root',
imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('mi-app');

    authStore = inject(AuthStore);

    constructor(){

        this.authStore.restoreSession();

    }

}

