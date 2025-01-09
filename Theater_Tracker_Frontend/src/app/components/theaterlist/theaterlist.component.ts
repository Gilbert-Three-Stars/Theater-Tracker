import { Component, Input } from '@angular/core';
import { Theater } from '../../models/theater.model';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-theaterlist',
  standalone: true,
  imports: [NgFor, CommonModule],
  templateUrl: './theaterlist.component.html',
  styleUrl: './theaterlist.component.css'
})
export class TheaterlistComponent {
  @Input() nearbyTheaters: [Theater, number][] = [];
  // we want to sort the nearbyTheaters by distance from the view center
  ngOnInit() {
    this.nearbyTheaters.sort((theaterA, theaterB) => { return theaterA[1] - theaterB[1] });
    console.log('in theater list')
    console.log(this.nearbyTheaters)
  }

}
