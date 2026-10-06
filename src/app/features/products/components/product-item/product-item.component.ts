
import { Component, input } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RatingStarsComponent } from '../../../../shared/components/rating-stars/rating-stars.component';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-item',
  imports: [CommonModule, RatingStarsComponent],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss',
})
export class ProductItemComponent {
    item = input.required<Product>();
    protected readonly Math = Math;
}
