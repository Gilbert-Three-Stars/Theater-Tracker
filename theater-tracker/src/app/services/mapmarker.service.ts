import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { LocationService } from '../services/location.service';

@Injectable({
  providedIn: 'root'
})
export class MapmarkerService {
  private mapSubject = new BehaviorSubject<boolean>(false);
  private locationService = new LocationService();
  private clickSubject = new BehaviorSubject<Object>({coords:this.locationService.getCoords(), hasClicked: false})
  mapLoaded$: Observable<boolean> = this.mapSubject.asObservable();
  mapClicked$: Observable<Object> = this.clickSubject.asObservable();
  setMapLoaded(isLoaded: boolean): void {
    this.mapSubject.next(isLoaded);
  }
  setMapClicked(clickObject: Object): void {
    this.clickSubject.next(clickObject);
  }

}
