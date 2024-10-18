import { ChangeDetectionStrategy, Component, Input, ElementRef } from '@angular/core';
import Map from 'ol/Map';
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

  constructor(private elementRef: ElementRef) { }

  ngAfterViewInit() {
    this.map.setTarget(this.elementRef.nativeElement);
  }
  
}
