import { Component, OnInit, afterNextRender } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MapComponent } from './components/map/map.component';
import { MarkersliderComponent } from './components/markerslider/markerslider.component';
import { HoveredtheaterlabelComponent } from './components/hoveredtheaterlabel/hoveredtheaterlabel.component';
import { TheaterbuttonComponent } from './components/theaterbutton/theaterbutton.component';
import { LocationService } from './services/location.service';
import { TheaterService } from './services/theater.service';
import { Theater } from './models/theater.model';
import Map from 'ol/Map';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import { Circle } from 'ol/geom';
import View from 'ol/View';
import Select from 'ol/interaction/Select.js';
import { Fill, Stroke, Style } from 'ol/style';
import { pointerMove } from 'ol/events/condition';
import { fromLonLat } from 'ol/proj';
import { LoginbuttonComponent } from "./components/loginbutton/loginbutton.component";
import { UserstateService } from './services/userstate.service';
import { LogoutbuttonComponent } from "./components/logoutbutton/logoutbutton.component";



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MapComponent,
    MarkersliderComponent,
    HoveredtheaterlabelComponent,
    TheaterbuttonComponent,
    CommonModule,
    LoginbuttonComponent,
    LogoutbuttonComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  
  title = 'theater-tracker';
  loginState: boolean = false;
  username: string = "";

  map!: Map;
  mapView = new View();
  curHoveredTheaterName: string = "<-Hover over theater to view name->";
  curResolution: number = 108.09828206839214;
  radiusPixels: number = 700;
  strokeWidth: number = 800;
  private zIndexTheaterLayer = 1;
  locationCircle: Circle = new Circle([0,0], 0);
  private theaterVectorSource = new VectorSource();
  private markerRadiusVectorSource = new VectorSource();
  
  constructor(
    private locService: LocationService, 
    private theaterService: TheaterService, 
    private userStateService: UserstateService
  ) {
    let ssrView = this.locService.getCoordsAndZoom();
    afterNextRender(() => {
      let afterRenderView = this.locService.getCoordsAndZoom();
      this.mapView.adjustZoom(afterRenderView.getZoom() - ssrView.getZoom());
      this.mapView.adjustCenter(
        [afterRenderView.getCoords()[0] - ssrView.getCoords()[0], 
        afterRenderView.getCoords()[1] - ssrView.getCoords()[1]]);
      
    })
  }
  
  ngOnInit(): void {
    this.userStateService.$loginObservable.subscribe(loginValue => {
      this.loginState = loginValue;
    })
    this.userStateService.$usernameObservable.subscribe(username => {
      this.username = username;
    })
    this.theaterService.getTheaters().subscribe(theaters => {
      let coordsZoom = this.locService.getCoordsAndZoom();
      this.mapView.setZoom(coordsZoom.getZoom());
      this.mapView.setCenter(coordsZoom.getCoords());
      this.locationCircle.setCenterAndRadius(coordsZoom.getCoords(), this.radiusPixels*coordsZoom.getResolution());
      this.populateTheaters(theaters);
      let theaterLayer = new VectorLayer({
        source: this.theaterVectorSource,
        zIndex: this.zIndexTheaterLayer,
        opacity: 0.6,
        maxResolution: 2800
      })
      // give radius layer a default feature      
      let radiusLayer = new VectorLayer({
        source: this.markerRadiusVectorSource,
        zIndex: 2,
        opacity: 0.3,
        updateWhileInteracting: true,
        
      })
      let radiusFeature = new Feature({
        geometry: this.locationCircle,
      })

      radiusFeature.setStyle(new Style({
        fill: new Fill({
          color: [240, 88, 240, 0],
        }),
        stroke: new Stroke({
          color: [123, 31, 162, 0.85],
          width: this.strokeWidth
        })
      }))
      this.markerRadiusVectorSource.addFeature(radiusFeature)
      this.map = new Map({
        view: this.mapView,
        layers: [
          new TileLayer({
            source: new OSM(),
            zIndex: 0,
          }),
          theaterLayer,
          radiusLayer
        ]
      })
      let hoverSelect = new Select({
        condition: pointerMove,
        layers: [theaterLayer],
        style: (feature) => {
          this.curHoveredTheaterName = feature.get('name');
          return new Style({
            fill: new Fill({
              color: [105, 240, 174, 0.8]
            }),
            stroke: new Stroke({
              color: [0, 0, 0, 0.9]
            })
          }) 
        }
      });
      this.map.addInteraction(hoverSelect)  
      let theaterSelected: boolean = false;
      this.map.on('pointermove', (event) => {
        if(theaterSelected) {
          theaterSelected = false;
          this.curHoveredTheaterName = "<-Hover over theater to view name->"
        }
        this.map.forEachFeatureAtPixel(event.pixel, (feature) => {
          theaterSelected = true;
          this.curHoveredTheaterName = feature.get('name');
          return true;
        }, {
          layerFilter: (layerCandidate) => {
            return layerCandidate.getZIndex() === this.zIndexTheaterLayer
          }
        })
     })  
    });
    this.mapView.on("change:center", (event) => this.centerChanged(event))
    this.mapView.on("change:resolution", (event) => this.resolutionChanged(event));
  }

  centerChanged(event: any) {
    // recenter the radius layer feature.
    let curCenter = this.mapView.getCenter();
    if(curCenter) {
      this.locationCircle.setCenter(curCenter);
    }
  }

  resolutionChanged(event: any) {
    let curRes = this.mapView.getResolution();
    if(curRes) {
      this.locationCircle.setRadius(this.radiusPixels*curRes);
      this.curResolution = curRes;
    }
  }
  // convert radius to scale
  // update marker scale accordingly
  changeMarkerScale(curPixels: number) {
    // let newScale = newRadius/(0.3*this.mapView.getResolution()!);
    this.radiusPixels = curPixels;
    this.locationCircle.setRadius(this.radiusPixels*this.curResolution);
    this.markerRadiusVectorSource.changed();
  }

  populateTheaters(theaters: Theater[]) {
    let theaterFeatureArr: Array<Feature> = new Array();
    for(let theater of theaters) {
      let curGeom = new Circle(
        fromLonLat([theater['longitude'], theater['latitude']]), 
        100 + 75*theater['numScreens'])
      let curTheaterFeature = new Feature({
        geometry: curGeom,
        name: theater['name']
      })
      curTheaterFeature.setStyle(new Style({
        fill: new Fill({
          color: [255, 88, 88, 0.4],
        }),
        stroke: new Stroke({})
      }))
      theaterFeatureArr.push(curTheaterFeature)
    }
    this.theaterVectorSource.clear(false)
    this.theaterVectorSource.addFeatures(theaterFeatureArr);
  }
}