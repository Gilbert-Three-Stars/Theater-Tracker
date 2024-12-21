import { Injectable } from '@angular/core';
import { fromLonLat } from 'ol/proj';
import { GeolocationService } from '@ng-web-apis/geolocation';
import { take } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class LocationService {
  protected _viewCenter = fromLonLat([-71.06, 42.36]); // default center
  constructor(private httpClient: HttpClient, private readonly geolocation$: GeolocationService) { }

  getCoordsAndZoom(): [Array<number>, number] {
    let zoom = 5;
    this.geolocation$.pipe(take(1)).subscribe((position) => {
      this._viewCenter = fromLonLat([position.coords.longitude, position.coords.latitude]);
      zoom = 12
    })
    if(zoom === 5) { // if we haven't found a location using geolocation
      this.httpClient.get('http://ip-api.com/json/').pipe(take(1)).subscribe((response) => {
        this._viewCenter = fromLonLat([Object.values(response)[8], Object.values(response)[7]])
        zoom = 10.5
      })
    }
    return [this._viewCenter, zoom]
  }

}
