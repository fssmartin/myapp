import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { AuthStore } from '../auth/auth.store';
import { Breadcrumb } from '../../layout/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-dashboard',
  imports: [Breadcrumb],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {

    remainingTime = signal('');
    authStore = inject(AuthStore);
    authService = inject(AuthService);



}
