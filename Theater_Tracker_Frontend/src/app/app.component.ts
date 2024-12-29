import { Component, OnInit, afterNextRender, Inject, afterRender } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MapComponent } from './components/map/map.component';
import { MarkersliderComponent } from './components/markerslider/markerslider.component';
import { HoveredtheaterlabelComponent } from './components/hoveredtheaterlabel/hoveredtheaterlabel.component';
import { LocationService } from './services/location.service';
import { TheaterService } from './services/theater.service';
import { Theater } from './models/theater.model';
import Map from 'ol/Map';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import { Point, Circle } from 'ol/geom';
import View from 'ol/View';
import Select from 'ol/interaction/Select.js';
import { Fill, Stroke, Style, Icon } from 'ol/style';
import { pointerMove } from 'ol/events/condition';
import { fromLonLat } from 'ol/proj';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MapComponent, MarkersliderComponent, HoveredtheaterlabelComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'theater-tracker';
  map!: Map;
  mapView = new View();
  radiusScaler: number = 0.077090340142445;
  curHoveredTheaterName: string = "<-Hover on theater to view name->";
  zIndexTheaterLayer = 1;
  private locationCircle: Circle = new Circle([0,0], 0);
  private static defaultResolution = 108.09828206839214;
  private theaterVectorSource = new VectorSource(); 
  private markerRadiusVectorSource = new VectorSource();
  private markerRadiusIcon = new Icon({
    anchor: [0.5, 0.5],
    anchorXUnits: 'fraction', 
    anchorYUnits: 'fraction',
    crossOrigin: 'anonymous',
    src: 'greencircleblackborder.png',
    scale: this.radiusScaler
  })
  
  constructor(private locService: LocationService, private theaterService: TheaterService) {
    let ssrView = this.locService.getCoordsAndZoom();
    afterNextRender(() => {
      let afterRenderView = this.locService.getCoordsAndZoom();
      this.mapView.adjustZoom(afterRenderView.getZoom() - ssrView.getZoom());
      this.mapView.adjustCenter(
        [afterRenderView.getCoords()[0] - ssrView.getCoords()[0], 
        afterRenderView.getCoords()[1] - ssrView.getCoords()[1]]);
      
    })
  }
  
  // TODO: Change radius layer
  // - add 'anti-radius' layer that is a semi-opaque layer that covers everything not within the radius
  // - make the actual radius layer very nearly transparent
  // - radius layer should also be centered and change with the change of the viewCenter
  //   -> this is found initially with the ssrView and afterRenderView  
  //      and should be changed with the dragging of the map
  ngOnInit(): void {
    this.theaterService.getTheaters().subscribe(theaters => {
      let coordsZoom = this.locService.getCoordsAndZoom();
      this.mapView.setZoom(coordsZoom.getZoom());
      this.mapView.setCenter(coordsZoom.getCoords());
      this.locationCircle.setCenterAndRadius(coordsZoom.getCoords(), 300*coordsZoom.getResolution());
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
        style: new Style({
          image: this.markerRadiusIcon
        }),
        zIndex: 2,
        opacity: 0.3,
        updateWhileInteracting: true
      })
      let radiusFeature = new Feature({
        geometry: this.locationCircle,
      })
      radiusFeature.setStyle(new Style({
        fill: new Fill({
          color: [240, 88, 240, 0.4],
        }),
        stroke: new Stroke({})
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
              color: [255, 50, 50, 0.6]
            }),
            stroke: new Stroke({
              color: [220, 220, 220, 0.9]
            })
          }) 
        }
      });
      this.map.addInteraction(hoverSelect)  
      let theaterSelected: boolean = false;
      this.map.on('pointermove', (event) => {
        if(theaterSelected) {
          theaterSelected = false;
          this.curHoveredTheaterName = "<-Hover on theater to view name->"
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
    this.map.on(["click"], (event) => this.mapClicked(event));
  }

  centerChanged(event: any) {
    // recenter the radius layer feature.
    console.log(this.mapView.getCenter())
    let curCenter = this.mapView.getCenter();
    if(curCenter) {
      this.locationCircle.setCenter(curCenter)
    }
  }

  resolutionChanged(event: any) {
    this.markerRadiusIcon.setScale((this.radiusScaler * AppComponent.defaultResolution)/this.mapView.getResolution()!);
  }
  // convert radius to scale
  // update marker scale accordingly
  changeMarkerScale(newRadius: number) {
    let newScale = newRadius/(0.3*this.mapView.getResolution()!);
    this.markerRadiusIcon.setScale(newScale)
    this.markerRadiusVectorSource.changed();
  }

  // when the map is clicked, the current location marker is removed (if there is one)
  // and the new location marker is added
  mapClicked(event: any) {
    let curClickFeature = new Feature({
      geometry: new Point(this.map.getCoordinateFromPixel(event.pixel))
    })
    /*
    this.markerRadiusVectorSource.clear(false)
    this.markerRadiusVectorSource.addFeature(curClickFeature)
    */
  }

  populateTheaters(theaters: Theater[]) {
    let theaterFeatureArr: Array<Feature> = new Array();
    for(let theater of theaters) {
      let curGeom = new Circle(
        fromLonLat([theater['latitude'], theater['longitude']]), 
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