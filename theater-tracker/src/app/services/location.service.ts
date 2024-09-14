import { Injectable } from '@angular/core';
import View from 'ol/View';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  protected view = new View();
  constructor() { 
    let viewCenter = [-7912769.528381, 5215479.987170];
    this.view.setZoom(12);
    if(navigator.geolocation) {
        // TODO: convert the coords to web mercator
      navigator.geolocation.getCurrentPosition(
        (position : GeolocationPosition) => {
        viewCenter[0] = position.coords.latitude;
        viewCenter[1] = position.coords.longitude;
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
