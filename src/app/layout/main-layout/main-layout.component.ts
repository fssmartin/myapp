import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Header } from '../header/header.component';
import { Sidebar } from '../sidebar/sidebar.component';
import { LoadingComponent } from '../../shared/ui/loading/loading.component';
import { ScrollTopComponent } from '../../shared/ui/scroll-top/scroll-top.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    Header,
    Sidebar,
    LoadingComponent,
    ScrollTopComponent
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayout {}