import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { interval } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthStore } from '../auth/auth.store';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {

remainingTime = signal('');
authStore = inject(AuthStore);
authService = inject(AuthService);

 
 


}
