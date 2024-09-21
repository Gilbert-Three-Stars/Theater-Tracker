import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapmarkerService {
  private mapSubject = new BehaviorSubject<boolean>(false);
  mapLoaded$: Observable<boolean> = this.mapSubject.asObservable();
  setMapLoaded(isLoaded: boolean): void {
    this.mapSubject.next(isLoaded);
  }

}
