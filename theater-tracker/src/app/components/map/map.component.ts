import { Component, Input } from '@angular/core';
import Map from 'ol/Map';



@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  template: `<div class="map-container" id="map-div" tabindex="0"></div>`,
  styles: [':host { width: 100%; height: 100%; display: block; }',
   '.map-container { flex: grow; width: 100%; height: 100%; display: block; }']
})
export class MapComponent {
  @Input() map!: Map;

  ngOnInit() {
    this.map.setTarget("map-div");
  }
  
}
