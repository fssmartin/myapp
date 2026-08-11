import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  template: `
      <div class="not-found">

        <!-- <img
          src="assets/images/404.svg"
          alt="Página no encontrada"
          class="not-found__image"> -->

        <h1>404</h1>

        <h2>Página no encontrada</h2>

        <a  routerLink="" class="btn btn-secondary">
          Volver al Dashboard
        </a> 

      </div>
  `,
  styleUrl: './not-found.component.scss',
})
export class NotFoundComponent {}
