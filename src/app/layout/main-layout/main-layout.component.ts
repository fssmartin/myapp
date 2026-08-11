import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Header } from '../header/header.component';
import { Sidebar } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    Header,
    Sidebar
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayout {}