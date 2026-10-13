import {   Injectable, signal } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class ScrollStateService {
 
  private _trendingScrollState =  signal<Record<string, number>>({});

  readonly trendingScroll = this._trendingScrollState.asReadonly();

  /* 
    por cada pagina sabre cual es su top para poder luego 
    {
      products: 3200,
      orders: 600
    }
  */

 save(key: string, scrollTop: number): void {

    console.log(
      'SAVE',
      key,
      scrollTop, 
    );

    this._trendingScrollState.update(positions => ({
      ...positions,
      [key]: scrollTop
    }));
     
  }

  get(key: string): number {

    console.log('KEY', key);

    console.log(
      'STATE',
      this._trendingScrollState()
    );

    console.log(
      'VALUE',
      this._trendingScrollState()[key]
    );


    return this._trendingScrollState()[key] ?? 0;
  }

}