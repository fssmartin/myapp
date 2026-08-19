import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';

import { AuthStore } from '../../auth.store';
import { AuthCardComponent } from '../../components/auth-card/auth-card.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { FormValidation } from '../../../../shared/utils/validation/form-validation-util';
import { LoadingService } from '../../../../core/services/loading.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    AuthCardComponent,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    JsonPipe
],
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  readonly authStore = inject(AuthStore);
  readonly loadingService = inject(LoadingService);

  errorMessage = '';
  username = '';
  password = '';

 
  protected readonly FormValidation = FormValidation;

  private fb = inject(FormBuilder);

  loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  }); 
 

  // login(): void { 
  //   this.errorMessage = '';
  //   if (!this.username.trim() || !this.password.trim()) {
  //     this.errorMessage = 'Debe indicar usuario y contraseña';
  //     return;
  //   } 
  //   this.authStore.login(this.username,this.password);
  // }

  onSubmit(): void {
    const { username, password } = this.loginForm.value;
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.errorMessage = 'Debe indicar usuario y contraseña';
      return;
    }
    this.authStore.login( username! , password!);
  }


  hide = signal(true);
  clickEvent(event: MouseEvent) {
    console.log("cambio ?? ", !this.hide())
    this.hide.set(!this.hide());
    event.stopPropagation();
  }


  // showError(fieldName: string): boolean {

  //   const field = this.loginForm.get(fieldName);

  //   return !!(
  //     field &&
  //     field.invalid &&
  //     (field.touched || field.dirty)
  //   );
  // }

  // getError(fieldName: string): string {
  //   const field = this.loginForm.get(fieldName);

  //   if (!field) {return '';}

  //   if (field.hasError('required')) {
  //     return 'Campo obligatorio';
  //   }

  //   if (field.hasError('minlength')) {
  //     const error = field.getError('minlength');
  //     return `Mínimo ${error.requiredLength} caracteres`;
  //   }

  //   return '';
  // }
  
}