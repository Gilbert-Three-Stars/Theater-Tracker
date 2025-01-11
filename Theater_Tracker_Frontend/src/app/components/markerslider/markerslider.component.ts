import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'app-markerslider',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSliderModule],
  templateUrl: './markerslider.component.html',
  styleUrl: './markerslider.component.css'
})

export class MarkersliderComponent {
  @Output() radiusChanged = new EventEmitter<number>();
  @Input() curResolution: number = 108.09828206839214;
  radiusPixels: number = 700
  public displayRadius: string = (((this.radiusPixels - 400) * this.curResolution)/1000).toFixed(1); 

  ngOnChanges(): void {
    this.displayRadius = (((this.radiusPixels - 400) * this.curResolution)/1000).toFixed(1);
  }
  
  onRadiusChange(event: Event): void {
    this.radiusPixels = (event.target as HTMLInputElement).valueAsNumber;
    this.displayRadius = (((this.radiusPixels - 400) * this.curResolution)/1000).toFixed(1);
    this.radiusChanged.emit(this.radiusPixels);
    
  }

}
