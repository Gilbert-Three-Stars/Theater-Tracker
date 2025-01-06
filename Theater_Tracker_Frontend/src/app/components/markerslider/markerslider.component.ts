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
  @Output() radiusChanged = new EventEmitter<number>();
  @Input() curResolution: number = 108.09828206839214;
  // curRadius is in kilometers
  public displayRadius: string = ((300 * this.curResolution)/1000).toFixed(1).toString(); 

  ngOnChanges(): void {
    this.displayRadius = ((300 * this.curResolution)/1000).toFixed(1).toString();
  }
  
  onRadiusChange(radius: number): void {
    this.displayRadius = radius.toFixed(1);
    this.radiusChanged.emit(radius);
  }

}
