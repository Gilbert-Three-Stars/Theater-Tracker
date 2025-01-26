import { Component, inject, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button'; 
import { MatDialog, MatDialogModule } from '@angular/material/dialog'; 
import { LoginmodalComponent } from '../loginmodal/loginmodal.component';
import { UserstateService } from '../../services/userstate.service';


@Component({
  selector: 'app-loginbutton',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './loginbutton.component.html',
  styleUrl: './loginbutton.component.css'
})

// step 1: modal data created in the log in button component based on the global log in state
// we need inputs for the log in state and username.

export class LoginbuttonComponent implements OnInit {

  readonly loginModal = inject(MatDialog);
  loginState: boolean = false;
  
  constructor(private userStateService: UserstateService) {}

  ngOnInit(): void {
    this.userStateService.$loginObservable.subscribe(loginValue => {
      console.log(loginValue);
      this.loginState = loginValue;
    })
  }
  



  openModal(): void {
    const modalRef = this.loginModal.open(LoginmodalComponent, {
      height: '75%',
      width: '30%',
    });
    modalRef.afterClosed().subscribe(result => {
      console.log('login modal closed')
    })
  }


}
