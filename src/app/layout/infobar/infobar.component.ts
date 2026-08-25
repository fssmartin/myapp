import { Component, inject} from '@angular/core';
import { InfobarService } from '../../core/services/infobar.service';
import { MatSidenavModule } from '@angular/material/sidenav';
 
@Component({
  selector: 'app-infobar',
  standalone: true,
  imports: [MatSidenavModule],
  templateUrl: './infobar.component.html',
  styleUrl: './infobar.component.scss'
})
export class Infobar {

  infobarService = inject(InfobarService);

}