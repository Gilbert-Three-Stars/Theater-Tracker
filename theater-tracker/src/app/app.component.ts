import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { MapComponent } from './components/map/map.component';
import { MarkerComponent } from './components/marker/marker.component';
import { CommonModule } from '@angular/common';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import Feature from 'ol/Feature.js';
import Style from 'ol/style/Style.js';
import Icon from 'ol/style/Icon.js'
import Point from 'ol/geom/Point.js';
import { LocationService } from './services/location.service';
import {fromLonLat} from 'ol/proj';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MapComponent, MarkerComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'theater-tracker';
  map!: Map;
  displayMarker!: boolean;
  
  
  ngOnInit(): void {
    this.initializeMap();
  }

  initializeMap(): void {
    let locService = new LocationService;
    let coords = locService.getCoords();
    console.log(coords)
    this.map = new Map({
      view: new View({
        center: [0, 0],
        zoom: 1,
      }),
      layers: [
        new TileLayer({
          source: new OSM(),
        })
      ]
    });
    
    let view =  new View({
      center: [0, 0],
      zoom: 4, // Increase zoom level
    })
    this.map.setView(view);
  }
}
