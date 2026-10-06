import {  computed, Injectable, signal } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class SkipPageService {

  readonly limit = 10;

  private readonly _page = signal(0);

  readonly page = this._page.asReadonly();

  readonly skip = computed(
    () => ( this._page() ) * this.limit
  );

  nextPage() {
    this._page.update(page => page + 1);
  }

  prevPage() {
    this._page.update(page => Math.max(1, page - 1));
  }

  goToPage(page: number) {
    this._page.set(page);
  }



  
}