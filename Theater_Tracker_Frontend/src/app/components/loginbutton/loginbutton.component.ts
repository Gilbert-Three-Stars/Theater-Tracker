import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button'; 
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog'; 
import { LoginmodalComponent } from '../loginmodal/loginmodal.component';


@Component({
  selector: 'app-loginbutton',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './loginbutton.component.html',
  styleUrl: './loginbutton.component.css'
})

// step 1: modal data created in the log in button component based on the global log in state
// we need inputs for the log in state and username.

export class LoginbuttonComponent {
  readonly loginModal = inject(MatDialog);
  buttonDisabled: boolean = false;

  @Input() loginState: boolean = false;
  @Input() username: string = "";

  openModal(): void {
    const modalRef = this.loginModal.open(LoginmodalComponent, {
      data: { loginState: this.loginState, username: this.username },
      height: '75%',
      width: '30%',
    });
    modalRef.afterClosed().subscribe(result => {
      console.log('login modal closed')
    })
  }

  // if the user is logged in, the button should be disabled
  buttonChange(loggedIn: boolean) {
    this.buttonDisabled = loggedIn;
  }

}
