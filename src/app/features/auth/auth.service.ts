import {   computed, inject, Injectable, signal } from "@angular/core";
import { HttpClient, HttpContext } from "@angular/common/http";
import { interval, map, Observable, take, tap } from "rxjs";
import { BaseUser, User } from "./models/auth.model";

import { environment } from '../../../environment/environment';
import { AuthMapper } from "./mappers/auth.mapper";
import { AuthDto } from "./models/auth-dto.model";
import { AUTH_CONSTANTS } from "../../core/constants/auth.constants";

import { ERROR_MESSAGE } from '../../core/http/http-context.tokens';


@Injectable({ providedIn: 'root' })
export class AuthService  {
 
// No debería:
//    ❌ Mostrar mensajes.
//    ❌ Navegar.
//    ❌ Modificar componentes.

  private apiAuth =     `${environment.apiUrl}/auth/login`; 
  private apiAuthMe =   `${environment.apiUrl}/auth/me`; 
 

  private http = inject(HttpClient); 

  constructor() {
      console.log("➡️ ___ AUTH SERVICE - INIT constructor")  
      console.log("➡️ ___ hay token ? ", !!this.getStoredToken() )     
  } 

  login(username: string, password: string ): Observable<BaseUser> {
    return this.http.post<AuthDto>(
      this.apiAuth, 
        { 
          username , password, expiresInMins: AUTH_CONSTANTS.TOKEN_EXPIRATION_MINUTES,
        },
        {
          context: new HttpContext().set(ERROR_MESSAGE,' Usuario o contraseña incorrectos --------------- ')
        }
      ).pipe(
      // take(1) asegura que la petición se cierre sola en cuanto responda el servidor
      take(1),
      tap((response) =>  console.log("➡️ ___ AUTH ____ USER DTO",response) ),
      tap((response) => {
            this.setStoredToken( response.accessToken );
            console.log('✅ Sesión Localstorage',response.accessToken); 
      }),
      map(response=>{
          return AuthMapper.toUser(response);
      }),      
      tap((response) =>  console.log("➡️ ___ AUTH ____ USER LOGADO",response) ),
      
    );
  }
  
  getMe(): Observable<BaseUser> {
    //el token viajará automáticamente gracias al Interceptor.
    return this.http.get<AuthDto>(
        this.apiAuthMe,
        {
          context: new HttpContext().set(ERROR_MESSAGE,' getMe !!')
        }
      ).pipe(
      take(1),
      map(response=>{
          return AuthMapper.toUser(response);
      }),      
      tap((response) =>  console.log("✅ ___ AUTH ____ ME ",response) ),
    );
  }  

  logout() { 
    this.clearSession();
  }

  getStoredToken():string|null{
    return localStorage.getItem('token')
  }

  private setStoredToken(token:string ){
    localStorage.setItem('token', token);
  }

  private clearSession(){
    localStorage.removeItem('token');
    console.log('✅ Sesión CLEAR - OUT !'); 
  }

  hasSession():boolean{
    return !! this.getStoredToken();
  }

}

 