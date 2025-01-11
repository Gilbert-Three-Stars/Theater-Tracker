import { Component, Input } from '@angular/core';
import { TheaterService } from '../../services/theater.service';
import { Theater } from '../../models/theater.model';
import { TheaterlistComponent } from '../theaterlist/theaterlist.component';
import { MatButtonModule } from '@angular/material/button'; 


@Component({
  selector: 'app-theaterbutton',
  standalone: true,
  imports: [TheaterlistComponent, MatButtonModule],
  templateUrl: './theaterbutton.component.html',
  styleUrl: './theaterbutton.component.css'
})
export class TheaterbuttonComponent {

  @Input() viewCenter: any = undefined;
  @Input() radiusPixels: number = 0;
  @Input() resolution: number = 0;
  @Input() strokeWidth: number = 800;
  nearbyTheaters: [Theater, number][] = [];
  
  
  constructor(private theaterService: TheaterService) {}

  onPress(): void {
    // curRadius in meters
    // subtract radius pixels by 400 because that is how much the radius gets decreased by the stroke
    this.theaterService.getNearbyTheaters(this.viewCenter, (this.radiusPixels - (this.strokeWidth/2)) * this.resolution)
    .subscribe(theaters => {
      this.nearbyTheaters = theaters.sort((theaterA, theaterB) => { return theaterA[1] - theaterB[1] });
    })
  }



}
