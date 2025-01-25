import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../../services/login.service';
import { MatDialogModule } from '@angular/material/dialog'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs'; 
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button'; 
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-loginmodal',
  standalone: true,
  imports: [
  MatDialogModule, 
  MatFormFieldModule, 
  MatInputModule, 
  ReactiveFormsModule, 
  MatButtonModule, 
  CommonModule, 
  MatTabsModule, 
  ],
  templateUrl: './loginmodal.component.html',
  styleUrl: './loginmodal.component.css'
})
export class LoginmodalComponent {
  /*
  Synchronous functions that take a control instance 
  and immediately return either a set of validation errors or null. 
  Pass these in as the second argument when you instantiate a FormControl.
  */
  constructor(private httpClient: HttpClient, private loginService: LoginService) {}
  loginError: string = '';
  registerError: string = '';
  // login -> login modal, register -> register modal, reset -> reset password modal
  modalType: string = 'login'; 

  username = new FormControl('', Validators.required);
  password = new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(200)]);
  loginButtonClick(): void {
    this.loginError = '';
    // TODO: Start a loading animation here
    let curUsername = this.username.getRawValue();
    let curPassword = this.password.getRawValue();
    if(curUsername === null) curUsername = ''; 
    if(curPassword === null) curPassword = '';
    this.loginService.login(curUsername, curPassword).subscribe(res => {
      // end the loading animation here.
      if(res === "Username not found" || res === "Incorrect password") {
        console.log(res)
        this.loginError = res;
        return;
      }
    })
    console.log(this.loginError)
  }

  registerButtonClick(): void {
    // loading animation starts here
    let curUsername = this.username.getRawValue();
    let curPassword = this.password.getRawValue();
    if(curUsername === null) curUsername = ''; 
    if(curPassword === null) curPassword = '';
    this.loginService.register(curUsername, curPassword).subscribe(res => {
      // loading animation ends here
      if(res === 'Username taken') {
        this.registerError = res;
        return;
      }
    })
  }

 
  modalSwitchClick(desiredModal: string): void {
    this.modalType = desiredModal;
  }

}
