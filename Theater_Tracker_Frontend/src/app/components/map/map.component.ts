import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Map from 'ol/Map';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="map-container" id="map-div" tabindex="0"></div>`,
  styles: [':host { width: 100%; height: 100%; display: block; }',
   '.map-container { flex: grow; width: 100%; height: 100%; display: block; }']
})
export class MapComponent implements OnInit{ 
  @Input() map!: Map;

  constructor() {}

  ngOnInit() {
    this.map.setTarget("map-div");
  }

  
}
