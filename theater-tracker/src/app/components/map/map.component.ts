import { ChangeDetectionStrategy, Component, OnInit, Input, ElementRef } from '@angular/core';
import Map from 'ol/Map';
import { LocationService } from '../../services/location.service';
import { MapmarkerService } from '../../services/mapmarker.service';
import {transform} from 'ol/proj';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import Feature from 'ol/Feature.js';
import Style from 'ol/style/Style.js';
import Icon from 'ol/style/Icon.js'
import Point from 'ol/geom/Point.js';
import {fromLonLat} from 'ol/proj';

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
  @Input() markerLayer!: VectorLayer;

  constructor(private elementRef: ElementRef, private mapMarkerService: MapmarkerService) { }

  ngOnInit() {
    let locService = new LocationService();
    let view = locService.getView();
    let coords = locService.getCoords();
    this.map.setView(view);
    console.log(coords)
    console.log(fromLonLat(coords))
    let markerLayer = new VectorLayer({
      className: 'marker-layer',
      opacity: 1,
      style: new Style({
        image: new Icon({
          src: 'theater-tracker/src/assets/markericon.png'
        })
      }),
      source: new VectorSource({
        features: [
          new Feature({
            //TODO: convert coordinates into correct format
            // get the marker to show up.
            geometry: new Point(coords)
          })
        ]
      }),
    });
    this.map.addLayer(markerLayer);
    this.map.setTarget(this.elementRef.nativeElement);
  }
  addMarker(event: Event): void {
    
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
