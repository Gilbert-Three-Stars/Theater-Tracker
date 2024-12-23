import { Injectable, afterNextRender } from '@angular/core';
import { GeolocationService } from '@ng-web-apis/geolocation';
import { take } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import View from 'ol/View';
import { fromLonLat } from 'ol/proj';
import { SimpleView } from '../models/simpleview.model';


@Injectable({
  providedIn: 'root'
})

export class LocationService {
  protected _viewCenter = fromLonLat([-71.06, 42.36]); // default center
  private zoom: number = 5;
  constructor(private httpClient: HttpClient, private readonly geolocation$: GeolocationService) { 
    afterNextRender(() => {
      this.geolocation$.pipe(take(1)).subscribe((position) => {
        this._viewCenter = fromLonLat([position.coords.longitude, position.coords.latitude]);
        this.zoom = 12
      })
    })
  }

  getCoordsAndZoom(): SimpleView {
    this.geolocation$.pipe(take(1)).subscribe((position) => {
      this._viewCenter = fromLonLat([position.coords.longitude, position.coords.latitude]);
      this.zoom = 12
    })
    if(this.zoom === 5) { // if we haven't found a location using geolocation
      this.httpClient.get('http://ip-api.com/json/').pipe(take(1)).subscribe((response) => {
        this._viewCenter = fromLonLat([Object.values(response)[8], Object.values(response)[7]])
        this.zoom = 10.5
      })
    }
    let openLayersView = new View();
    openLayersView.setCenter(this._viewCenter);
    openLayersView.setZoom(this.zoom);
    let viewResolution = openLayersView.getResolutionForZoom(this.zoom);
    let curView = new SimpleView(this.zoom, this._viewCenter, viewResolution);
    return curView
  }

}
