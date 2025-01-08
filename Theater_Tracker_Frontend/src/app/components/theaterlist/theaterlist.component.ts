import { Component, Input } from '@angular/core';
import { Theater } from '../../models/theater.model';

@Component({
  selector: 'app-theaterlist',
  standalone: true,
  imports: [],
  templateUrl: './theaterlist.component.html',
  styleUrl: './theaterlist.component.css'
})
export class TheaterlistComponent {
  @Input() nearbyTheaters: [Theater, number][] = [];

}
