import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from '../../environments/env'; // dev
import { env } from 'process';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.httpClient.post(`${environment.API_URL}/login`, {'username': username, 'password': password})
    .pipe(map(response => {
      // currently not even getting here.
      return response;
    }))
  }

}
