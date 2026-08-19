import { AbstractControl, FormGroup } from '@angular/forms';

export class FormValidation {

  static showError(form: FormGroup, fieldName: string): boolean {

    const field = form.get(fieldName);

    return !!(
      field &&
      field.invalid &&
      (field.touched || field.dirty)
    );
  }

  static getError( form: FormGroup, fieldName: string): string {

    const field = form.get(fieldName);

    if (!field) {
      return '';
    }

    if (field.hasError('required')) {
      return 'Campo obligatorio';
    }

    if (field.hasError('email')) {
      return 'Email incorrecto';
    }

    if (field.hasError('minlength')) {

      const error = field.getError('minlength');

      return `Mínimo ${error.requiredLength} caracteres`;
    }

    return '';
  }
}