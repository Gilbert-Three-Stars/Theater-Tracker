import { Injectable } from '@angular/core';
import { environment } from '../../environments/env';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Theater } from '../models/theater.model';
import { LineString } from 'ol/geom';
import { fromLonLat } from 'ol/proj';



@Injectable({
  providedIn: 'root'
})
export class TheaterService {
  constructor(private httpClient: HttpClient) { }

  getTheaters(): Observable<Theater[]> {
    return this.httpClient.get(`${environment.API_URL}/theaters`).pipe(map(json => {
      let counter = 0
      let theaters: Theater[] = new Array<Theater>;
      for (let theaterObj of Object.values(json)) {
        theaters.push(theaterObj)
        counter++
      }
      return theaters
    }))
  }

  getNearbyTheaters(viewCenter: number[], radius: number): Observable<[Theater, number][]> {
    return this.httpClient.get(`${environment.API_URL}/theaters`).pipe(map(json => {
      // we're returning an array of tuples where the first element is the theater
      // and the second element is the length from the center of the current view.
      let theaterCount = 0;
      let nearbyTheaters = new Array<[Theater, number]>;
      for (let theaterObj of Object.values(json)) {
        let lineCoords = new Array<number[]>;
        lineCoords.push(fromLonLat([theaterObj['longitude'], theaterObj['latitude']]))
        lineCoords.push(viewCenter);
        let curLine = new LineString(lineCoords)
        // getLength is in meters, so radius should also be in meters
        if(curLine.getLength() <= radius) {
          nearbyTheaters.push([theaterObj, curLine.getLength()]);
          theaterCount += 1;
        }
        //TODO: perhaps sort by distance so that we can get the first closest 100. 
        // in the scenario that there are more than 100 theaters in the radius
        if(theaterCount >= 100) break;
      }
      return nearbyTheaters
    }))
  }
}
