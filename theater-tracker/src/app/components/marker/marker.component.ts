import { Component, Input, ElementRef } from '@angular/core';

import MousePosition from 'ol/control/MousePosition.js';
import * as olEvents from 'ol/events';
import { MapmarkerService } from '../../services/mapmarker.service';
import { NgIf } from '@angular/common';



@Component({
  selector: 'app-marker',
  standalone: true,
  imports: [],
  templateUrl: './marker.component.html',
  styleUrl: './marker.component.css',
  providers: [MapmarkerService, NgIf],
})
export class MarkerComponent {
  @Input() displayMarker!: boolean;
  
  constructor(private mapMarkerService:MapmarkerService) { 
    this.displayMarker = false;
    this.mapMarkerService.mapLoaded$.subscribe((mapIsLoaded) => {
      if(mapIsLoaded) { // checking if the map is loaded
        this.mapMarkerService.mapClicked$.subscribe((clickObj) => {
          if(clickObj.hasClicked) {
            this.displayMarker = true;
            console.log('display marker is getting set to true')
          }
        })
      }
    })
  }
  // TODO: construct a marker in which the user clicks on the map to set their position
  // on click, a marker is created and an icon is shown where the user clicked.
  // The marker can only be created after two conditions are met: 
  // The map is created, and the user has clicked on the map.
  // The map is created: use mapLoaded element of the map component
  
  ngOnInit() { // this is what happens after the marker gets placed.
    this.mapMarkerService.mapLoaded$.subscribe((mapIsLoaded) => {
      if(mapIsLoaded) { // checking if the map is loaded
        this.mapMarkerService.mapClicked$.subscribe((clickObj) => {
          if(clickObj.hasClicked) {
            this.displayMarker = true;
            console.log('display marker is getting set to true')
          }
        })
      }
    })
  }

}
