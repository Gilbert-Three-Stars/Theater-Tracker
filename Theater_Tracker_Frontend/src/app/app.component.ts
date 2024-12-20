import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MapComponent } from './components/map/map.component';
import { CommonModule } from '@angular/common';
import { LocationService } from './services/location.service';
import { TheaterService } from './services/theater.service';
import { Theater } from './models/theater.model';
import Map from 'ol/Map';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon'
import Point from 'ol/geom/Point';
import View from 'ol/View';
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
  private markerVectorSource = new VectorSource();
  private theaterVectorSource = new VectorSource();

  constructor(private locService: LocationService, private theaterService: TheaterService) {}
  
  ngOnInit(): void {
    this.theaterService.getTheaters().subscribe(theaters => {
      let coordsZoom = this.locService.getCoordsAndZoom();
      let curView = new View();
      curView.setZoom(coordsZoom[1]);
      curView.setCenter(coordsZoom[0]);
      this.populateTheaters(theaters)
      let theaterLayer = new VectorLayer({
        source: this.theaterVectorSource,
        style: new Style({
          image: new Icon({
            anchor: [0.5, 0.5],
            anchorXUnits: 'fraction',
            anchorYUnits: 'fraction',
            crossOrigin: 'anonymous',
            src: 'reddotmarker.png',
            scale: 0.025
          })
        }),
        zIndex: 1,
        opacity: 0.6
      })
      let markerLayer = new VectorLayer({
        source: this.markerVectorSource,
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
        zIndex: 2
      })
      this.map = new Map({
        view: curView,
        layers: [
          new TileLayer({
            source: new OSM(),
            zIndex: 0,
          }),
          theaterLayer,
          markerLayer,
        ]
      })
      
    });
    this.map.on(["click"], (event) => this.mapClicked(event))
  }

  // when the map is clicked, the current location marker is removed (if there is one)
  // and the new location marker is added
  mapClicked(event: any) {
    let curClickFeature = new Feature({
      geometry: new Point(this.map.getCoordinateFromPixel(event.pixel))
    })
    this.markerVectorSource.clear(false) 
    this.markerVectorSource.addFeature(curClickFeature)
  }

  populateTheaters(theaters: Theater[]) {
    let theaterFeatureArr: Array<Feature> = new Array();
    for(let theater of theaters) {
      let curGeom = new Point(fromLonLat([theater['latitude'], theater['longitude']]))
      console.log(curGeom.getProperties())
      curGeom.scale(10/theater['numScreens'])
      console.log(curGeom.getProperties())
      let curTheaterFeature = new Feature({
        geometry: curGeom
      })
      curTheaterFeature.setStyle(new Style({
        image: new Icon({
          anchor: [0.5, 0.5],
          anchorXUnits: 'fraction',
          anchorYUnits: 'fraction',
          crossOrigin: 'anonymous',
          src: 'redcircleblackborder.png',
          scale: (.0125 + .0125 * (theater['numScreens']/10))/2
        })
      }))
      theaterFeatureArr.push(curTheaterFeature)
    }
    this.theaterVectorSource.clear(false)
    this.theaterVectorSource.addFeatures(theaterFeatureArr)
  }

}