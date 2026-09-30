import { Component, input } from '@angular/core';
 
@Component({
  selector: 'app-rating-stars',
  imports: [],
  template: `
    <div class="rating-stars">
        <!-- <span>{{ rating().toFixed(1) }}</span> -->
        <div class="rating-stars-content">
        @for (star of stars; track $index) {
            <span>
            @if (star === 'full') {
              ★
            } @else if (star === 'half') {
              ⯨
            } @else {
              ☆
            }
          </span>
        }
        </div>
    </div>
  `,
  styles: [`
    .rating-stars{
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0 2px;
      line-height: normal;
      & span{font-size: 12px;}
      .rating-stars-content{
        display: flex;
        justify-content: left;
        align-items: start;
        position: relative;top: -2px;
        & span{
          top:auto;
          font-size: 16px;
          margin: 0;
          padding: 0; 
          color: orange;
        }
      }
    }    
  `]
})
export class RatingStarsComponent {

    rating = input(0);

    get stars(): ('full' | 'half' | 'empty')[] {

      const stars: ('full' | 'half' | 'empty')[] = [];

      for (let i = 1; i <= 5; i++) {
          if (this.rating() >= i) {
            stars.push('full');
          } else if (this.rating() >= i - 0.5) {
            stars.push('half');
          } else {
            stars.push('empty');
          }
        }

        return stars;
    }
}
