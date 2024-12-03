import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MapComponent } from './components/map/map.component';
import { CommonModule } from '@angular/common';
import { LocationService } from './services/location.service';
import Map from 'ol/Map';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import Feature from 'ol/Feature.js';
import Style from 'ol/style/Style.js';
import Icon from 'ol/style/Icon.js'
import Point from 'ol/geom/Point.js';
import View from 'ol/View';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MapComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'theater-tracker';
  map!: Map;
  private vectorSource = new VectorSource();

  constructor(private locService: LocationService) {}
  
  ngOnInit(): void {
    let coordsZoom = this.locService.getCoordsAndZoom();
    let curView = new View();
    console.log(coordsZoom[1])
    curView.setZoom(coordsZoom[1]);
    curView.setCenter(coordsZoom[0])
    let markerLayer = new VectorLayer({
      source: this.vectorSource,
      style: new Style({
        image: new Icon({
          anchor: [0.5, 0.8],
          anchorXUnits: 'fraction',
          anchorYUnits: 'fraction',
          crossOrigin: 'anonymous',
          src: 'location-marker.png',
          scale: 0.13
        })
      }),
      zIndex: 1
    })
    this.map = new Map({
      view: curView,
      layers: [
        new TileLayer({
          source: new OSM(),
          zIndex: 0,
        }),
        markerLayer
      ]
    })
    this.map.on(["click"], (event) => this.mapClicked(event))
  }

  // when the map is clicked, the current location marker is removed (if there is one)
  // and the new location marker is added
  mapClicked(event: any) {
    let curClickFeature = new Feature({
      geometry: new Point(this.map.getCoordinateFromPixel(event.pixel))
    })
    // TODO: take another look at this once you can add theater markers to the map.
    this.vectorSource.clear(false) 
    this.vectorSource.addFeature(curClickFeature)
  }

}