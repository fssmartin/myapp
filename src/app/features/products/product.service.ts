import {   computed, inject, Injectable, signal } from "@angular/core";
import { HttpClient, HttpContext } from "@angular/common/http";
import {    delay, map, Observable, take, tap } from "rxjs";
import {  Product, ProductsResponse } from "./models/product.model";

import { environment } from '../../../environment/environment';

import { ProductMapper } from "./mappers/product.mapper";
 
import { ERROR_MESSAGE } from '../../core/http/http-context.tokens';
import { AUTH_CONSTANTS } from "../../core/constants/auth.constants";

@Injectable({ providedIn: 'root' })
export class ProductService  {
 

  private apiProducts =     `${environment.apiUrl}/products?limit=10`; 
  
  private http = inject(HttpClient); 

  constructor() {
      console.log("➡️ ___ PRODUCT SERVICE - INIT constructor")  
  } 

  getAllProducts(): Observable<Product[]> {
    return this.http.get<ProductsResponse>(
        this.apiProducts,
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

}