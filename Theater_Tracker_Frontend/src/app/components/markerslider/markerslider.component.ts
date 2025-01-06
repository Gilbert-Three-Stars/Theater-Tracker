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
// TODO: Make the marker change the pixels instead of the radius 
export class MarkersliderComponent {
  @Output() radiusChanged = new EventEmitter<number>();
  @Input() curResolution: number = 108.09828206839214;
  radiusPixels: number = 700
  public displayRadius: string = (((this.radiusPixels - 400) * this.curResolution)/1000).toFixed(1); 

  ngOnChanges(): void {
    this.displayRadius = (((this.radiusPixels - 400) * this.curResolution)/1000).toFixed(1);
  }
  
  // the slider should change the radius pixels
  onRadiusChange(curPixels: number): void {
    this.radiusPixels = curPixels;
    // might not need the following line of code because we already have ngOnChanges
    this.displayRadius = (((this.radiusPixels - 400) * this.curResolution)/1000).toFixed(1);
    this.radiusChanged.emit(curPixels);
  }

}
