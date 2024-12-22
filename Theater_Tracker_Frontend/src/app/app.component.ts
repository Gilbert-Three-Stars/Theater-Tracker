import { Component, OnInit, afterNextRender, Inject, afterRender } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MapComponent } from './components/map/map.component';
import { MarkersliderComponent } from './components/markerslider/markerslider.component';
import { LocationService } from './services/location.service';
import { TheaterService } from './services/theater.service';
import { Theater } from './models/theater.model';
import { SimpleView } from './models/simpleview.model';
import Map from 'ol/Map';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import Point from 'ol/geom/Point';
import View from 'ol/View';
import { fromLonLat } from 'ol/proj';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MapComponent, MarkersliderComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'theater-tracker';
  map!: Map;
  mapView = new View();
  radiusConstant = 0.075;
  private static defaultResolution = 108.09828206839214;
  private markerVectorSource = new VectorSource();
  private theaterVectorSource = new VectorSource(); 
  private markerRadiusVectorSource = new VectorSource();
  private markerRadiusIcon = new Icon({
    anchor: [0.5, 0.5],
    anchorXUnits: 'fraction', 
    anchorYUnits: 'fraction',
    crossOrigin: 'anonymous',
    src: 'greencircleblackborder.png',
    scale: this.radiusConstant
  })
  
  constructor(private locService: LocationService, private theaterService: TheaterService) {
    let ssrView = this.locService.getCoordsAndZoom();

    afterNextRender(() => {
      let afterRenderView = this.locService.getCoordsAndZoom();
      console.log('ssrView:')
      ssrView.printView()
      console.log('afterRenderView:')
      afterRenderView.printView()
      this.mapView.adjustZoom(afterRenderView.getZoom() - ssrView.getZoom());
      this.mapView.adjustCenter(
        [afterRenderView.getCoords()[0] - ssrView.getCoords()[0], 
        afterRenderView.getCoords()[1] - ssrView.getCoords()[1]]);
      
    })
  }
  
  
  ngOnInit(): void {
    this.theaterService.getTheaters().subscribe(theaters => {
      let coordsZoom = this.locService.getCoordsAndZoom()
      this.mapView.setZoom(coordsZoom.getZoom());
      this.mapView.setCenter(coordsZoom.getCoords());
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
        zIndex: 3
      })
      let radiusLayer = new VectorLayer({
        source: this.markerRadiusVectorSource,
        style: new Style({
          image: this.markerRadiusIcon
        }),
        zIndex: 2,
        opacity: 0.3
      })
      this.map = new Map({
        view: this.mapView,
        layers: [
          new TileLayer({
            source: new OSM(),
            zIndex: 0,
          }),
          theaterLayer,
          markerLayer,
          radiusLayer
        ]
      })
      
    });
    this.mapView.on("change:resolution", (event) => this.resolutionChanged(event))
    this.map.on(["click"], (event) => this.mapClicked(event))
  }

  resolutionChanged(event: any) {
    this.markerRadiusIcon.setScale((this.radiusConstant * AppComponent.defaultResolution)/this.mapView.getResolution()!)
  }

  // when the map is clicked, the current location marker is removed (if there is one)
  // and the new location marker is added
  mapClicked(event: any) {
    let curClickFeature = new Feature({
      geometry: new Point(this.map.getCoordinateFromPixel(event.pixel))
    })
    // UNCOMMENT THE MARKERVECTORSOURCE LINES TO BRING BACK THE LOCATION MARKER

    // this.markerVectorSource.clear(false) 
    this.markerRadiusVectorSource.clear(false)
    // this.markerVectorSource.addFeature(curClickFeature)
    this.markerRadiusVectorSource.addFeature(curClickFeature)
    console.log(this.mapView.getResolution())
  }

  populateTheaters(theaters: Theater[]) {
    let theaterFeatureArr: Array<Feature> = new Array();
    for(let theater of theaters) {
      let curGeom = new Point(fromLonLat([theater['latitude'], theater['longitude']]))
      curGeom.scale(10/theater['numScreens'])
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