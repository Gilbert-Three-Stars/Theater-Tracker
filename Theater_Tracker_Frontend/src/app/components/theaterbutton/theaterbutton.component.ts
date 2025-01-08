import { Component, Input } from '@angular/core';
import { TheaterService } from '../../services/theater.service';
import { Theater } from '../../models/theater.model';
import { Coordinate } from 'ol/coordinate';


@Component({
  selector: 'app-theaterbutton',
  standalone: true,
  imports: [],
  templateUrl: './theaterbutton.component.html',
  styleUrl: './theaterbutton.component.css'
})
export class TheaterbuttonComponent {

  @Input() viewCenter: any = undefined;
  @Input() radiusPixels: number = 0;
  @Input() resolution: number = 0;
  
  constructor(private theaterService: TheaterService) {}

  



}
