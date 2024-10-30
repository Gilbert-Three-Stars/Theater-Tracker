import { Injectable, Input } from '@angular/core';
import Map from 'ol/Map';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  @Input() map!: Map

  constructor() { }

  addMarker() {
    
  }
}
