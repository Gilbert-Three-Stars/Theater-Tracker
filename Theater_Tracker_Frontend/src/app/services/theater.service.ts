import { Injectable } from '@angular/core';
import { environment } from '../../environments/env';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Theater } from '../models/theater.model'



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
  /*
  findNearbyTheaters(viewCenter: number[], radius: number): Observable<Theater[]> {
    return this.httpClient.get(`${environment.API_URL}/theaters`).pipe(map(json => {
      let nearbyTheaters: Theater[] = new Array<Theater>;
      for (let theaterObj of Object.values(json)) {
        // get current coords of theater obj
        // compare to viewCenter
        // see if the distance between the points is smaller than the radius 
        // if it is, push to nearbyTheaters
        let curCoords = [theaterObj['latitude'], theaterObj['longitude']]

      }
    }))
  }
  */
}
