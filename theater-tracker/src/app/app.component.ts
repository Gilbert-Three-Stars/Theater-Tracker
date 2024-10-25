import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import Map from 'ol/Map';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { MapComponent } from './components/map/map.component';

import { CommonModule } from '@angular/common';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import Feature from 'ol/Feature.js';
import Style from 'ol/style/Style.js';
import Icon from 'ol/style/Icon.js'
import Point from 'ol/geom/Point.js';
import { LocationService } from './services/location.service';
import Collection from 'ol/Collection';
import { fromLonLat } from 'ol/proj';




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
  
  ngOnInit(): void {
    let locService = new LocationService;
    let curView = locService.getView();
    console.log("cur view center: " + curView.getCenter())
    let curCoords = curView.getCenter();
    console.log(curCoords)
    let curLocationFeature = new Feature({
      geometry: new Point(locService.getCoords('EPSG:3857')),
    })
    let markerLayer = new VectorLayer({
      source: new VectorSource({
        features: [curLocationFeature]
      }),
      style: new Style({
        image: new Icon({
          anchor: [0.5, 1],
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
  }

}
