import { Component, inject, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Header } from '../header/header.component';
import { Sidebar } from '../sidebar/sidebar.component';
import { LoadingComponent } from '../../shared/ui/loading/loading.component';
import { ScrollTopComponent } from '../../shared/ui/scroll-top/scroll-top.component';
 

import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { InfobarService } from '../../core/services/infobar.service';

import { MatTabsModule } from '@angular/material/tabs';
import { MatDivider } from "@angular/material/divider";
import { MatListModule } from "@angular/material/list"; 

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    Header,
    Sidebar,
    LoadingComponent,
    ScrollTopComponent,
    // Infobar,
    MatSidenavModule,
    MatTabsModule,
    MatListModule
],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayout {
 

  private infobarService = inject(InfobarService);

  @ViewChild('sidenav') sidenav!: MatSidenav;
 
  ngAfterViewInit(): void {
      // Pequeña espera para asegurar que está renderizado
      setTimeout(() => {
        console.log("🔵 Registrando sidenav:", this.sidenav);
        this.infobarService.registerSidenav(this.sidenav);
      }, 300);
}

  
}