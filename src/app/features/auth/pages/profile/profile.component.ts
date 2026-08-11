import { Component} from '@angular/core';  
import { AuthService } from '../../auth.service';
import { CommonModule } from '@angular/common'; 
import { AuthStore } from '../../auth.store';
 


@Component({
  selector: 'app-profile',
  standalone: true,
  imports:[CommonModule],
  template: `
    <div class="container">
        <div class="col">
            <h3>PROFILE </h3>
            <p>This is the profile page of the application.</p>   
            <pre>{{ authStore.user() | json }}</pre>
        </div>
        <hr>
        <pre>
            Si dentro del profile , se pudiera :<br>
            ├── editar perfil
            ├── avatar
            ├── preferencias
            ├── notificaciones
            ├── seguridad
            ├── cambio contraseña
            └── actividad usuario
            <br>
            LLevate profile fuera de Auth
        </pre>
    </div>     
  `
})
export class ProfileComponent {  


  constructor(
    public authStore:AuthStore )
    {  }

 
 
  


}



