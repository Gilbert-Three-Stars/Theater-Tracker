import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button'; 
import { MatDialog, MatDialogModule } from '@angular/material/dialog'; 
import { LoginmodalComponent } from '../loginmodal/loginmodal.component';


@Component({
  selector: 'app-loginbutton',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './loginbutton.component.html',
  styleUrl: './loginbutton.component.css'
})
export class LoginbuttonComponent {
  readonly loginModal = inject(MatDialog);

  openModal(): void {
    const modalRef = this.loginModal.open(LoginmodalComponent);
    modalRef.afterClosed().subscribe(result => {
      console.log('login modal closed')
    })
  }

}
