import { Injectable } from '@angular/core';
import View from 'ol/View';
import {transform} from 'ol/proj';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  protected view = new View();
  constructor() { 
    let viewCenter = [-7912769.528381, 5215479.987170];
    this.view.setZoom(12);
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position : GeolocationPosition) => {
        viewCenter[0] = position.coords.longitude;
        viewCenter[1] = position.coords.latitude;
        viewCenter = transform(viewCenter, 'EPSG:4326', 'EPSG:3857');
        this.view.setCenter(viewCenter)
      }, 
      (err: GeolocationPositionError) => {
        console.warn(err.message)
        this.view.setCenter(viewCenter)
      })
    }
    else {
      console.warn("Couldn't get navigator.geolocation")
      this.view.setCenter(viewCenter);
    }
  }
  getView() : View {
    return this.view;
  }
}
