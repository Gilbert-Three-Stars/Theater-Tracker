import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';


interface ClickObject {
  coords: Array<number> | undefined;
  hasClicked: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class MapmarkerService {
  
  private mapSubject = new BehaviorSubject<boolean>(false);
  private clickSubject = new BehaviorSubject<ClickObject>({coords: undefined, hasClicked: false})
  mapLoaded$: Observable<boolean> = this.mapSubject.asObservable();
  mapClicked$: Observable<ClickObject> = this.clickSubject.asObservable();
  setMapLoaded(isLoaded: boolean): void {
    this.mapSubject.next(isLoaded);
  }
  setMapClicked(clickObject: ClickObject): void {
    this.clickSubject.next(clickObject);
  }

}
