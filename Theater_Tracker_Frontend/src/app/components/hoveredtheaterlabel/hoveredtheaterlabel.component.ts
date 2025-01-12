import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hoveredtheaterlabel',
  standalone: true,
  imports: [],
  templateUrl: './hoveredtheaterlabel.component.html',
  styleUrl: './hoveredtheaterlabel.component.css'
})
export class HoveredtheaterlabelComponent {
  @Input() theaterName: string = "<-Hover over theater to view name->";

}
