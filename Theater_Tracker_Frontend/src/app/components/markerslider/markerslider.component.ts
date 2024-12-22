import { Component, Input, OnInit, input } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import { CommonModule } from '@angular/common';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import View from 'ol/View';

@Component({
  selector: 'app-markerslider',
  standalone: true,
  imports: [CommonModule, NgxSliderModule],
  templateUrl: './markerslider.component.html',
  styleUrl: './markerslider.component.css'
})
export class MarkersliderComponent {
  private static defaultResolution = 108.09828206839214;
  @Input() radiusConstant!: number;
  @Input() mapView!: View;
  // increasing the radius constant is what will change the size of the circle
  // in terms of actual distance
  value: number = 15; // this is the default distance in kilometers
  options: Options = {
    floor: 0,
    ceil: 350,
    vertical: true,
  }

}
