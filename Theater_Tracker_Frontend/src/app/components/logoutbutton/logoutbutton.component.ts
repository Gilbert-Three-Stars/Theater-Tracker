import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button'; 
import { UserstateService } from '../../services/userstate.service';


@Component({
  selector: 'app-logoutbutton',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './logoutbutton.component.html',
  styleUrl: './logoutbutton.component.css'
})
export class LogoutbuttonComponent {

  constructor(private userStateService: UserstateService) {}

  buttonClick(): void {
    this.userStateService.logout();
  }

}
