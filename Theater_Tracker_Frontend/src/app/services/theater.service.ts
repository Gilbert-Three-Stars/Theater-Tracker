import { Injectable } from '@angular/core';
import { environment } from '../../environments/env';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Theater } from '../models/theater.model';
import { LineString } from 'ol/geom';
import { fromLonLat } from 'ol/proj';



@Injectable({
  providedIn: 'root'
})
export class TheaterService {
  constructor(private httpClient: HttpClient) { }

  testObservable(): Observable<any> {
    const testObs = new Observable((subscriber) => {
      subscriber.next(1)
    })
    return testObs
  }


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

  getNearbyTheaters(viewCenter: number[], radius: number): Observable<Theater[]> {
    return this.httpClient.get(`${environment.API_URL}/theaters`).pipe(map(json => {
      let nearbyTheaters: Theater[] = new Array<Theater>;
      for (let theaterObj of Object.values(json)) {
        let lineCoords = new Array<number[]>;
        lineCoords.push(fromLonLat([theaterObj['longitude'], theaterObj['latitude']]))
        lineCoords.push(viewCenter);
        let curLine = new LineString(lineCoords)
        if(curLine.getLength() <= radius) {
          nearbyTheaters.push(theaterObj)
        }
      }
      return nearbyTheaters
    }))
  }
}
