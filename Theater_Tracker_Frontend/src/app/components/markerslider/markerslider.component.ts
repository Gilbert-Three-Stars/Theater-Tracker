import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Icon from 'ol/style/Icon';


@Component({
  selector: 'app-markerslider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './markerslider.component.html',
  styleUrl: './markerslider.component.css'
})
export class MarkersliderComponent {
  private static defaultResolution = 108.09828206839214;
  @Input() markerRadiusIcon!: Icon

  ngOnInit(): void {

  }

}
