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
    /*
    this.httpClient.get(`${environment.API_URL}/theaters`).subscribe(json => {      
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
    if(this.theaters.length === 0) {
      console.log("Wasn't able to get theaters")
    }
    return this.theaters
    */
  }
}
