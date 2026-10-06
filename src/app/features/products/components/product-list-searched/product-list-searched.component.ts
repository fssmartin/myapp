
import { Component, input, output, signal } from '@angular/core';
import { Product } from '../../models/product.model';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-product-list-searched',
  imports: [MatIconModule,JsonPipe],
  templateUrl: './product-list-searched.component.html',
  styleUrl: './product-list-searched.component.scss',
})
export class ProductListSearchedComponent {

      searchKeys = input<string[]>([]);
}
