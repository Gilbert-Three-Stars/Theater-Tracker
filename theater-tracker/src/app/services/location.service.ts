import { Injectable } from '@angular/core';
import View from 'ol/View';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  protected view = new View();
  constructor() { 
    this.view.setZoom(12);
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        let viewCenter = [];
        // TODO: make sure that the coords are in web mercator form.
        viewCenter.push(position.coords.latitude);
        viewCenter.push(position.coords.longitude);
        this.view.setCenter(viewCenter);
      })
    }
    else {
      this.view.setCenter([-7912769.528381, 5215479.987170]);
      console.log("Geolocation not supported, setting center to default position")
    }
  }
  getView() : View {
    return this.view;
  }
}
