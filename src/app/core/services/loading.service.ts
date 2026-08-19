import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  
  // Signal privado
  private _isLoading = signal(false);
  
  // Signal readonly para que otros componentes lean
  readonly isLoading = this._isLoading.asReadonly();
  
  // Métodos para mostrar/ocultar
  show(): void {
    this._isLoading.set(true);
  }
  
  hide(): void {
    this._isLoading.set(false);
  }
  
  // Útil para operaciones con then
  async withLoading<T>(promise: Promise<T>): Promise<T> {
    this.show();
    try {
      return await promise;
    } finally {
      this.hide();
    }
  }
}