import {   computed, inject, Injectable, signal } from "@angular/core";
import { HttpClient, HttpContext } from "@angular/common/http";
import {    delay, map, Observable, take, tap } from "rxjs";
import {  Product, ProductsResponse } from "./models/product.model";

import { environment } from '../../../environment/environment';

import { ProductMapper } from "./mappers/product.mapper";
 
import { ERROR_MESSAGE } from '../../core/http/http-context.tokens';
import { AUTH_CONSTANTS } from "../../core/constants/auth.constants";
import { SkipPageService } from "../../shared/services/skip-page.service";

@Injectable({ providedIn: 'root' })
export class ProductService  {
 

  private apiProductSearch = `${environment.apiUrl}/products/search?q=`; 
  
  private skipPageService= inject(SkipPageService);

  private readonly _pages = signal<Record<number, Product[]>>({});

  private http = inject(HttpClient); 

  constructor() {
      console.log("➡️ ___ PRODUCT SERVICE - INIT constructor")  
  } 

  getAllProducts(): Observable<Product[]> {

    const skip  = this.skipPageService.skip();
    const limit = this.skipPageService.limit;
    const apiProducts = `${environment.apiUrl}/products?limit=10&skip=${skip}`; 
    
    console.log("skip,limit_______________",skip,limit);
    
    return this.http.get<ProductsResponse>(
          apiProducts,
          {context: new HttpContext().set(ERROR_MESSAGE,'No se pudieron cargar los productos')}      
      ).pipe(
          delay(AUTH_CONSTANTS.API_DELAY_MS),
          // take(1) asegura que la petición se cierre sola en cuanto responda el servidor
          take(1),            
          tap((response) =>  console.log('✅ -------  getAllProducts DTO SERVICIO  ---------',response) ),
          // map(response => response.products.map(productDto => 
          //   ProductMapper.toProduct(productDto)
          // )), 
          //EN VEZ de hacerlo aqui con un map, lo haago en el maper la transformacion.. devuelvo ya un array y le paso el array de productos.
          map(response =>  ProductMapper.dtoArToProductdAr(response.products)), 
    );
  } 

  getSearch(search:string): Observable<Product[]> {

    let urlSearch = `${this.apiProductSearch}${search}`;
    
    console.log("--------------------------",urlSearch) 

    return this.http.get<ProductsResponse>(
        urlSearch,
        {context: new HttpContext().set(ERROR_MESSAGE,'No se pudieron cargar los productos')}      
      ).pipe(
        delay(AUTH_CONSTANTS.API_DELAY_MS),
        // take(1) asegura que la petición se cierre sola en cuanto responda el servidor
        take(1),            
        tap((response) =>  console.log('✅ -------  getSearch DTO SERVICIO  ---------',response) ),
        // map(response => response.products.map(productDto => 
        //   ProductMapper.toProduct(productDto)
        // )), 
        // EN VEZ de hacerlo aqui con un map, lo haago en el maper la transformacion..
        //  devuelvo ya un array y le paso el array de productos.
        map(response =>  ProductMapper.dtoArToProductdAr(response.products)), 
    );
  } 

  savePage(page: number, products: Product[]) {
    
    /* 
      {
        1: [prod1, prod2, prod3],
        2: [prod11, prod12, prod13],
        3: [prod21, prod22, prod23]
      }
    */

    this._pages.update(pages => ({
      ...pages,
      [page]: products
    }));
  
  }  

  getPage(page: number): Product[] | undefined {
    return this._pages()[page];
  }

}