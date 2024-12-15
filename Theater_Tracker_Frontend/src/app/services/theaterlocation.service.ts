import { Injectable } from '@angular/core';
import { environment } from '../../environments/env';
import Map from 'ol/Map';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Theater } from '../models/theater.model'

@Injectable({
  providedIn: 'root'
})
export class TheaterlocationService {
  private theaters: Theater[] = []
  constructor(private httpClient: HttpClient) { }


  getTheaters(): Array<Theater>{
      this.httpClient.get(`${environment.API_URL}/theaters`).subscribe(json => {
      // TODO: update theaters based on the keys
      
      for (let theaterStr in Object.values(json)) {
        let jsonObj = JSON.parse(theaterStr)
        let theaterObj = new Theater(
          jsonObj['address'], 
          jsonObj['id'], 
          jsonObj['latitude'], 
          jsonObj['longitude'],
          jsonObj['name'],
          jsonObj['numScreens']
        )
        this.theaters.push(theaterObj)
      }
      
    })
    return this.theaters
  }
}
