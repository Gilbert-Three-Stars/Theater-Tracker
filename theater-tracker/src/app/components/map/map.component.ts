import { ChangeDetectionStrategy, Component, OnInit, Input, ElementRef } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import { LocationService } from '../../services/location.service';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  template: ``,
  providers: [LocationService],
  styles: [':host { width: 100%; height: 100%; display: block; }',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent {
  @Input() map!: Map;
  constructor(private elementRef: ElementRef) {
  }
  ngOnInit() {
    // TODO: make a view that centers around the user's location if it is given.

    const defaultView = new View();
    defaultView.setCenter([-7912769.528381, 5215479.987170]);
    defaultView.setZoom(12);
    let locService = new LocationService();
    let view = locService.getView();
    this.map.setView(view);
    this.map.setTarget(this.elementRef.nativeElement);
  }
}
