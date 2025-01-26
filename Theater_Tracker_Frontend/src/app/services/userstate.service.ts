import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserstateService {

  private loginState: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private usernameState: BehaviorSubject<string> = new BehaviorSubject("");

  public readonly $loginObservable: Observable<boolean> = this.loginState.asObservable();
  public readonly $usernameObservable: Observable<string> = this.usernameState.asObservable();
  
  constructor() { }

  login(username: string): void {
    this.loginState.next(true);
    this.usernameState.next(username);
  }  

  logout(): void {
    this.loginState.next(false);
    this.usernameState.next("");
  } 

}
