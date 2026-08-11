import { Component, input } from '@angular/core';

@Component({
  selector: 'app-auth-card',
  standalone: true,
  templateUrl: './auth-card.component.html',
  styleUrl: './auth-card.component.scss'
})
export class AuthCardComponent {

  title = input('title');
  subtitle = input('subtitle');


}