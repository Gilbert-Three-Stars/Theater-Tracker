import { ChangeDetectionStrategy, Component, OnInit, Input, ElementRef } from '@angular/core';
import Map from 'ol/Map';
import { LocationService } from '../../services/location.service';
import { MapmarkerService } from '../../services/mapmarker.service';
import {transform} from 'ol/proj';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import Feature from 'ol/Feature.js';
import Style from 'ol/style/Style.js';
import Icon from 'ol/style/Icon.js'
import Point from 'ol/geom/Point.js';
import {fromLonLat} from 'ol/proj';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  template: ``,
  providers: [LocationService, MapmarkerService],
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
