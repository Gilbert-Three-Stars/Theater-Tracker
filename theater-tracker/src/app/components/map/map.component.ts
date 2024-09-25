import { ChangeDetectionStrategy, Component, OnInit, Input, ElementRef } from '@angular/core';
import Map from 'ol/Map';
import { LocationService } from '../../services/location.service';
import { MapmarkerService } from '../../services/mapmarker.service';
import {transform} from 'ol/proj';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  template: ``,
  providers: [LocationService, MapmarkerService],
  styles: [':host { width: 100%; height: 100%; display: block; }',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent {
  @Input() map!: Map;

  constructor(private elementRef: ElementRef, private mapMarkerService: MapmarkerService) { }

  ngOnInit() {
    let locService = new LocationService();
    let view = locService.getView();
    this.map.setView(view);
    this.map.setTarget(this.elementRef.nativeElement);
  }

  ngAfterViewInit() {
    this.mapMarkerService.setMapLoaded(true);
    this.map.on('click', (event) => {
      let coords = transform(event.coordinate, 'EPSG:4326', 'EPSG:3857');
      this.mapMarkerService.setMapClicked({coords: coords, hasClicked: true})
    })
  }
  // this method will be called when the user clicks on the map.
  updateMarker(): void {
    // TODO: Find where the user clicked the map and update the coordinates accordingly
    this.map.on('click', (event) => {
      let coords = transform(event.coordinate, 'EPSG:4326', 'EPSG:3857');
      this.mapMarkerService.setMapClicked({coords: coords, hasClicked: true})
    })
  }
}
