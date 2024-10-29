import { Injectable } from '@angular/core';
import View from 'ol/View';
import { fromLonLat } from 'ol/proj';
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
  constructor(private httpClient: HttpClient, private readonly geolocation$: GeolocationService) { }
  getView() : View {
    return this.view;
  }
  getCoordsAndZoom(): [Array<number>, number] {
    let zoom = 5;
    this.geolocation$.pipe(take(1)).subscribe((position) => {
      this._viewCenter = fromLonLat([position.coords.longitude, position.coords.latitude]);
      this.locAccuracy = 2;
      zoom = 12
    })
    if(this.locAccuracy === 0) {
      this.httpClient.get('http://ip-api.com/json/').pipe(take(1)).subscribe((response) => {
        this._viewCenter = fromLonLat([Object.values(response)[8], Object.values(response)[7]])
        this.locAccuracy = 1
        zoom = 8.5
      })
    }
    return [this._viewCenter, zoom]
    
  }
}
