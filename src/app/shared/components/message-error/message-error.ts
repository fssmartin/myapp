import { Component, inject, input } from '@angular/core';
import { MAT_DIALOG_DATA,  MatDialogRef } from '@angular/material/dialog';import { MatButtonModule } from '@angular/material/button';

import { timer } from 'rxjs';


@Component({
  selector: 'app-message-error',
  standalone: true,
  imports: [ 
  ],
  template: `
      <div class="message-error">
          <p style="text-align: center;color:red">{{msgError()}}</p>
      </div> 
  `
})
export class MessageErrorComponent {
  msgError = input.required();
}