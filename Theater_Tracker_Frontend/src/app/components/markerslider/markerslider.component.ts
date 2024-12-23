import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-markerslider',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './markerslider.component.html',
  styleUrl: './markerslider.component.css'
})
// TODO: Make the marker change the scale instead of the radius and calculate the radius
// based on the current scale + resolution
export class MarkersliderComponent {
  private static defaultResolution: number = 108.09828206839214;
  private static defaultScale: number = 0.077090340142445;
  @Output() radiusChanged = new EventEmitter<number>();
  // curRadius is in kilometers
  public curRadius: number = (300 * MarkersliderComponent.defaultResolution * MarkersliderComponent.defaultScale)/1000;
  public displayRadius: string = this.curRadius.toFixed(1).toString(); 

  onRadiusChange(radius: number): void {
    this.displayRadius = radius.toFixed(1);
    this.radiusChanged.emit(radius);
  }

}
