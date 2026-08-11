import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { timer } from 'rxjs';


@Component({
  selector: 'app-message-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule
  ],
  template: `

    <h2 mat-dialog-title>{{ data.title }} - {{ data.type }}</h2>
    @if(data.subtitle){
      <h3 mat-dialog-title>{{ data.subtitle }}</h3>
    }  

    <mat-dialog-content>
      {{ data.message }} 
    </mat-dialog-content>


    @if(data.buttons){
      <mat-dialog-actions align="end">
        @if(data.buttons.cancel){
          <button mat-button mat-dialog-close>
            Cancelar
          </button>
        }
        @if(data.buttons.cancel){
          <button mat-raised-button color="primary" 
            (click)="guardar()">  
            Guardar
          </button>
        }  
      </mat-dialog-actions>
    }

  `
})
export class MessageDialogComponent {

  readonly data = inject(MAT_DIALOG_DATA);
  readonly dialogRef = inject(MatDialogRef<MessageDialogComponent>);

  ngOnInit(): void {  
    if(this.data.autoCloseMs){
      timer(this.data.autoCloseMs).subscribe(() => {
        this.guardar();
      });
    }
  }
  
  guardar(): void {
    this.dialogRef.close(true);
  }

}