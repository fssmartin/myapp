import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  template: `
      <div class="not-found">

        <!-- <h1>404</h1> -->

        <img
          src="images/404.png"
          alt="Página no encontrada"
          class="not-found__image">


        <h2>Página no encontrada o de acceso restringido </h2>

        <a  routerLink="" class="btn btn-secondary">
          Volver al Dashboard
        </a> 

      </div>
  `,
  styleUrl: './not-found.component.scss',
})
export class NotFoundComponent {}
