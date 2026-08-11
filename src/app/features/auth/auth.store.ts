import { DestroyRef, Injectable, computed, inject, signal } from '@angular/core';
 
import { Router } from '@angular/router'; 
import { AuthService } from './auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'; 
import { BaseUser } from './models/auth.model'; 
import { AUTH_CONSTANTS } from "../../core/constants/auth.constants";

import { MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from '../../shared/components/message-dialog/message-dialog';


@Injectable({
  providedIn: 'root'
})
export class AuthStore {

  private readonly _state = signal<BaseUser | null>(null);
  private readonly _loading = signal(false);
  private readonly _error = signal<string | null>(null);
  private readonly _remainingMs = signal(0); 
  private readonly _warningShown = signal(false); 

  readonly user = this._state.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();
  //readonly remainingMs = this._remainingMs.asReadonly();
  
  readonly isLogged = computed(() => this._state() !== null);
  readonly isLoading = computed(() => this.loading() );

  readonly remainingTime = computed(() => {

      const totalSeconds = Math.floor(this._remainingMs() / 1000);
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;

      return `${minutes}:${seconds
        .toString()
        .padStart(2, '0')}`;

  });

  readonly remainingClassTime = computed(() => {
      const totalSeconds = Math.floor(this._remainingMs() / 1000);
 
      let miclass = 'normal';
      if(totalSeconds<1)return "";
      if( totalSeconds < 60 ){
        miclass = 'danger';
      } else if( totalSeconds < 120){
        miclass = 'warning';
      }
      return miclass;
  });

  private destroyRef = inject(DestroyRef);
  private sessionTimer?: ReturnType<typeof setInterval>;


  constructor(private authService:AuthService,
              private router:Router,
              private dialog: MatDialog){
                 
  } 

  setLoading(value: boolean): void {
      this._loading.set(value);
  }
    
  setUser(user: BaseUser): void {
    this._state.set(user);
  }

  clearUser(): void {
    this._state.set(null);
  }

  restoreSession():void {

      this.setLoading(true); 

      let hasToken = this.authService.hasSession();

      if(!hasToken){
          this.setLoading(false); 
          return; 
      }  
      this.authService.getMe().pipe(
                takeUntilDestroyed(this.destroyRef),  
          )    
          .subscribe({
            next:(userResponse)=>{
              this.startSessionTimer();
              this._state.set(userResponse);
              this.setLoading(false);    
              console.log('✅ ¡USER RESTORE F5 !!!');               
              this.router.navigate(['/']);   
            },
            error:(err)=>{
              this.setLoading(false);  
              this.logout();
            },
      })
  }

  login(username: string, password:string): void {

    this.setLoading(true); 
    
    this.authService.login(username,password)
    .pipe(
        takeUntilDestroyed(this.destroyRef),  
      )    
    .subscribe({
      next:(userResponse)=>{
        this._state.set(userResponse);
        console.log('🆗 ¡Login correcto!');   
        
       
        this.startSessionTimer();           
        this.setLoading(false);    
        this.router.navigate(['/']);   
      },
      error:(err)=>{
        console.log("X Se ha producido un error, ",err)
        this._error.set("Usuario o contraseña incorrectos");
        this.setLoading(false);  
      },
    })
      
    
  }

  logout() {
      this.stopSessionTimer();
      this.clearUser();           
      this.authService.logout();
      this.router.navigate(['/']);  
  }  

  startSessionTimer(): void {

      if (this.sessionTimer) {
        return;
      }

      this.sessionTimer = setInterval(() => {
        this.updateRemainingTime(); 
      }, 1000);

  }
    
  stopSessionTimer(): void {
    if (this.sessionTimer) {
      clearInterval(this.sessionTimer);
      this.sessionTimer = undefined;
      console.log('✅ STOP sessionTimer');  
    }
    this._remainingMs.set(0);
  }

  private updateRemainingTime(): void {

    const token = this.authService.getStoredToken(); 
    if (!token) {
      this._remainingMs.set(0);
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expirationTime = payload.exp * 1000;
      const remaining = Math.max( 0 , expirationTime - Date.now() );
      this._remainingMs.set(Math.max(0, remaining)); 
      
      this.checkExpirationWarning(remaining);

    } catch {
      this._remainingMs.set(0);
    }

  }

  private checkExpirationWarning(remainingMs: number): void {

      if (remainingMs <= AUTH_CONSTANTS.WARNING_TIME_MS && 
          remainingMs > 0 && 
          !this._warningShown() ) {
            
          this._warningShown.set(true);

          this.dialog.open(MessageDialogComponent,{
            width: '450px',
            panelClass: 'custom-dialog',
            data: {
              autoCloseMs: 1500,
              type:    'warning',
              title:   'Sesión próxima a expirar',
              message: 'Quedan menos de 2 minutos'
            }          
          });
      }

      if (remainingMs === 0  ){
        
          if (this.sessionTimer) {
            clearInterval(this.sessionTimer);
            this.sessionTimer = undefined;
          }

          this._warningShown.set(true);

          const dialogRef = this.dialog.open(MessageDialogComponent,{
            width: '450px',
            disableClose: true, //Impedir cierre accidental
            hasBackdrop: true, //Fondo oscuro
            autoFocus: true,
            panelClass: 'custom-dialog-bye',
            data: {
              autoCloseMs: 1500,
              type:    'error',
              title:   'Sesión expirada',
              message: 'Hasta pronto ' + this._state()?.name,
              buttons: {
                accept: true,
                cancel: false
              }
            }  
          });          
          // CUANDO SALE DEL DIALOG 
          dialogRef.afterClosed().subscribe(result => {
            this.logout()            
            console.log(result); // true
          });
      }


  }

}











