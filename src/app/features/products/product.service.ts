import {   computed, inject, Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { interval, map, Observable, take, tap } from "rxjs";
import {  Product, ProductDto, ProductsResponse } from "./models/product.model";

import { environment } from '../../../environment/environment';

import { AUTH_CONSTANTS } from "../../core/constants/auth.constants";
import { ProductMapper } from "./mappers/product.mapper";


@Injectable({ providedIn: 'root' })
export class ProductService  {
 


  private apiProducts =     `${environment.apiUrl}/products?limit=10`; 
  
  private http = inject(HttpClient); 

  constructor() {
      console.log("➡️ ___ PRODUCT SERVICE - INIT constructor")  
  } 

  getAllProducts(): Observable<Product[]> {
    return this.http.get<ProductsResponse>(this.apiProducts).pipe(
      // take(1) asegura que la petición se cierre sola en cuanto responda el servidor
      take(1),
      tap((response) =>  console.log("✅ ___ PRODUCTS DTO ____ ",response) ),
      map(response => response.products.map(productDto => 
        ProductMapper.toProduct(productDto)
      )), 
    );
  } 

}

 