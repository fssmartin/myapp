import { Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon'; 
import { RouterLink } from '@angular/router';
import { AuthStore } from '../../features/auth/auth.store';
import { MatMenuModule } from '@angular/material/menu';
import { NgClass } from "../../../../node_modules/@angular/common/types/_common_module-chunk";
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-header',
  standalone: true, 
  imports: [
    RouterLink,
    MatIconModule,
    MatMenuModule,
    MatDivider,
],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class Header {

    authStore = inject(AuthStore);
    menuOpen = signal(false);

    readonly user = this.authStore.user; 

    logout(){
      this.authStore.logout();
    }

    toggleMenu(){
        this.menuOpen.update(value => !value);
    }
 
    toggleFullscreen(): void {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    } 

}