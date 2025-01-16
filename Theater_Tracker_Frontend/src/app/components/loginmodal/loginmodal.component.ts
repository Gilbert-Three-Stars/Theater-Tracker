import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/env'; // dev env
import { MatDialogModule } from '@angular/material/dialog'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button'; 

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
  constructor(private httpClient: HttpClient) {}
  loginError: string = '';

  username = new FormControl('', Validators.required);
  password = new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(200)]);
  loginButtonClick(): void {
    console.log('log in button clicked')
    console.log('username: ' + this.username.getRawValue());
    console.log('password: ' + this.password.getRawValue());
    /*
    this.httpClient
    .get(`${environment.API_URL}/login/${this.username.getRawValue()}/${this.password.getRawValue()}`)
    .pipe(map(json => {

    }))
    */
    // TODO: Send the username and password to the backend and see if its in the user table 
    // sending an array will send over json
    this.httpClient.post(`${environment.API_URL}/login`, [this.username.getRawValue(), this.password.getRawValue()])
    
  }
}
