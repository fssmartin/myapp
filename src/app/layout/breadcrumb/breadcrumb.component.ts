import { JsonPipe } from '@angular/common';
import { Component, Input, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
 


interface BreadcrumbItem {
  option: string;
  url: string;
}

interface InterBreadCrumb {
  title: string;
  menu: BreadcrumbItem[];
}


@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [ 
    MatIconModule, RouterLink
  ],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class Breadcrumb {

    data = input.required<InterBreadCrumb>();

}