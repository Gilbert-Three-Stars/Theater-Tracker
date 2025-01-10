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


}
