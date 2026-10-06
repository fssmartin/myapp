
import { Component, output, signal } from '@angular/core';
import { Product } from '../../models/product.model';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-search',
  imports: [FormsModule,MatIconModule,MatInputModule,MatFormFieldModule],
  templateUrl: './product-search.component.html',
  styleUrl: './product-search.component.scss',
})
export class ProductSearchComponent {

  readonly search = output<string>();   

  searchText = signal('');

  onSearch(): void {
    
    const text = this.searchText().trim();

    if (text) {
      console.log("emito",text)
        this.search.emit(text);
    }
  }
  



}
