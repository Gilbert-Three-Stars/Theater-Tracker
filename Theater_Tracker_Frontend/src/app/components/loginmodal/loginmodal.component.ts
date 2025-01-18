import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/env'; // dev env
import { LoginService } from '../../services/login.service';
import { MatDialogModule } from '@angular/material/dialog'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button'; 
import { Observable, map } from 'rxjs';


@Component({
  selector: 'app-loginmodal',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule],
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

  username = new FormControl('', Validators.required);
  password = new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(200)]);
  loginButtonClick(): void {
    console.log('username: ' + this.username.getRawValue());
    console.log('password: ' + this.password.getRawValue());
    // TODO: Start a loading animation here
    let curUsername = this.username.getRawValue();
    let curPassword = this.password.getRawValue();
    if(curUsername === null) curUsername = ''; 
    if(curPassword === null) curPassword = '';
    this.loginService.login(curUsername, curPassword).subscribe(res => {
      // end the loading animation here.
      if(res === "user not found" || res === "incorrect password") {
        console.log(res)
        this.loginError = res;
        return;
      }
      

    })
  }
}
