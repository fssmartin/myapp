import { HttpContextToken } from '@angular/common/http';
 
export const ERROR_MESSAGE = new HttpContextToken<string>(
    () => 'Ha ocurrido un error'
);