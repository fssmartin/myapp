import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { AuthStore } from '../../features/auth/auth.store';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterLink,
    MatListModule,
    MatIconModule,  
    RouterLinkActive,
    NgClass
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class Sidebar {


    authStore = inject(AuthStore);

    menuItems = [
      {
        label: 'Dashboard',
        icon: 'dashboard',
        route: '/',
        exact: true,
        role:null
      },
      {
        label: 'Productos',
        icon: 'inventory_2',
        role:'ADMIN',
        expanded: false,
        children: [
          {
            label: 'Alta de productos pepe asd asd',
            route: '/products',
            role:'ADMIN',
          },
          {
            label: 'Generar listado',
            route: '/products/report',
            role:'ADMIN',
          },
        ],
      },
      {
        label: 'Administración',
        icon: 'admin_panel_settings',
        route: '/admin',
        role:'USER',

      },
    ];

    toggle(item: any): void {
        item.expanded = !item.expanded;
    }
    
    isMobileMenuOpen = false;

    toggleMobileMenu(): void {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    }

    logout(){
      this.authStore.logout();
    }

}