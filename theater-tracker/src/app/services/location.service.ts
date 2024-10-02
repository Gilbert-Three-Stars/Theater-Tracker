import { Injectable } from '@angular/core';
import View from 'ol/View';
import {transform} from 'ol/proj';
import { ProjectionLike } from 'ol/proj';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  protected view = new View();
  protected _viewCenter = [-7912769.528381, 5215479.987170]
  constructor() { 
    this.view.setZoom(12);
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position : GeolocationPosition) => {
        this._viewCenter[0] = position.coords.longitude;
        this._viewCenter[1] = position.coords.latitude;
        this._viewCenter = transform(this._viewCenter, 'EPSG:4326', 'EPSG:3857');
        this.view.setCenter(this._viewCenter)
      }, 
      (err: GeolocationPositionError) => {
        console.warn(err.message)
        this.view.setCenter(this._viewCenter)
      })
    }
    else {
      console.warn("Couldn't get navigator.geolocation")
      this.view.setCenter(this._viewCenter);
    }
  }
  getView() : View {
    return this.view;
  }
  getCoords(projection: ProjectionLike): Array<number> {
    return transform(this._viewCenter, 'EPSG:3857', projection);
  }
}
