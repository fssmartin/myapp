import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-dashboard-card',
  standalone: true,
  templateUrl: './dashboard-card.component.html',
  styleUrl: './dashboard-card.component.scss'
})
export class DashboardCardComponent {

  flipped = signal(false);

  flip(): void {
    this.flipped.update(value => !value);
  }

}