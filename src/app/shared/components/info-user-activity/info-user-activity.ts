import { Component, inject, input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { timer } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { BaseUser } from '../../../features/auth/models/auth.model';


@Component({
  selector: 'app-info-user-activity',
  standalone: true,
  imports: [ 
  ],
  template: `
 
       <div class="panel" >
        <h2>Actividad reciente</h2>
        <p>Último acceso: 30/07/2026 10:30</p>
        <p>Última operación validada: Transferencia SEPA</p>
        <p>tiempo de session: <span> {{ remainingTime() }}</span></p>
      </div>

      <!-- <div class="panel">
        <h2>Actividad reciente</h2>
        <p>Último acceso: {{ infoUser().lastLogin }}</p>
        <p>Última operación validada:{{ infoUser().lastOperation }}</p>
        <p>Tiempo de sesión: <span>{{ infoUser().remainingTime }}</span></p>
      </div>       -->

  `
})
export class InfoUserActivityComponent {

  infoUser = input.required<BaseUser|null>();   
  remainingTime= input.required<string>();   

  ngOnInit(): void {  
    
  }
   

}