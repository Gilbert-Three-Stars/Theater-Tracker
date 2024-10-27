import { Injectable } from '@angular/core';
import View from 'ol/View';
import {transform} from 'ol/proj';
import { fromLonLat } from 'ol/proj';
import { ProjectionLike } from 'ol/proj';
import { GeolocationService } from '@ng-web-apis/geolocation';
import { take } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  protected view = new View();
  protected _viewCenter = fromLonLat([-71.06, 42.36]);
  private locAccuracy = 0;
  private httpClient!: HttpClient
  constructor(private readonly geolocation$: GeolocationService ) { 
    this.geolocation$ = new GeolocationService();
  }
  getView() : View {
    return this.view;
  }
  getCoords(): Array<number> {
    this.geolocation$.pipe(take(1)).subscribe((position) => {
      this._viewCenter = fromLonLat([position.coords.longitude, position.coords.latitude]);
      this.locAccuracy = 2;
    })
    if(this.locAccuracy === 0) {
      const ipObservable = this.httpClient.get('http://ip-api.com/json/')
      ipObservable.pipe(take(1)).subscribe((response) => {
        console.log("this is the response: ", response)
        this.locAccuracy = 1
      })
    }
    console.log(this.locAccuracy)
    return this._viewCenter
    /*
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          return fromLonLat([position.coords.longitude, position.coords.latitude])
        },
        (err: GeolocationPositionError) => {
          console.warn(err.message);
          console.log("coordinates being retrieved may not reflect current location");
          return transform(this._viewCenter, 'EPSG:3857', projection);
        }
      )
    }
    console.warn("Couldn't get navigator.geolocation");
    return transform(this._viewCenter, 'EPSG:3857', projection);
    */
  }
}
