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
import { TileJSON, Vector } from 'ol/source';
import ImageLayer from 'ol/layer/Image';
import Static from 'ol/source/ImageStatic.js';
import ImageSource from 'ol/source/Image.js';



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
  private markerSource = new VectorSource({
    features: []
  })
  private markerLayer = new VectorLayer({
    source: this.markerSource,
    zIndex: 1
  })
  
  ngOnInit(): void {
    this.initializeMap();
    console.log(this.markerSource.get('features'))
    this.addMarker();
    console.log(this.markerSource.get('features'))
  }

  initializeMap(): void {
    let locService = new LocationService;
    this.map = new Map({
      view: locService.getView(),
      layers: [
        new TileLayer({
          source: new OSM(),
          zIndex: 0,
        }),
        this.markerLayer
      ],
      target: 'map',
    });
    
  }
  addMarker(): void {
    let locService = new LocationService();
    console.log(locService.getCoords('EPSG:3857'))
    let curLocationFeature = new Feature({
      geometry: new Point(locService.getCoords('EPSG:3857')),
    })
    let curLocationStyle = new Style({
      image: new Icon({
        anchor: [0.5, 10],
        anchorXUnits: 'fraction', 
        anchorYUnits: 'pixels',
        src: 'theater-tracker/public/reddotmarker.png'
      })
    })
    curLocationFeature.setStyle(curLocationStyle)
    this.markerSource.addFeature(curLocationFeature)
    /*
    let markerLayer = new VectorLayer({
      source: new VectorSource({
        features: [curLocationFeature]
      }),
      zIndex: 1
    })
    */
  }

}
