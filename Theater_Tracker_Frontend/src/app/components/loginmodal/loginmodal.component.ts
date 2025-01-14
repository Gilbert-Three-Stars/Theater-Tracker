import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog'; 


@Component({
  selector: 'app-loginmodal',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './loginmodal.component.html',
  styleUrl: './loginmodal.component.css'
})
export class LoginmodalComponent {

}
