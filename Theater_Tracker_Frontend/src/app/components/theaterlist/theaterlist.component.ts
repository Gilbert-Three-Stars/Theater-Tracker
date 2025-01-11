import { Component, Input, ViewChild } from '@angular/core';
import { Theater } from '../../models/theater.model';
import { CommonModule,  } from '@angular/common';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-theaterlist',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule],
  templateUrl: './theaterlist.component.html',
  styleUrl: './theaterlist.component.css'
})
export class TheaterlistComponent {
  @Input() nearbyTheaters: [Theater, number][] = [];
  theaterDataSource = new MatTableDataSource<[Theater, number]>([]);
  pageSize = 5;
  curPageIndex = 0;
  @ViewChild(MatTable) theaterTable!: MatTable<any>;

  displayedColumns = ['name', 'address', 'distance'];
  // since our only input is nearbyTheaters, and nearbyTheaters changes as a result of the button being
  // pressed, this happens when the button gets pressed. We want to reset the curPageIndex.
  ngOnChanges(): void {
    console.log('should only occur on button press');
    let curTheaterArr = []
    this.curPageIndex = 0;
    for(let i = 0; i < Math.min(this.pageSize, this.nearbyTheaters.length); i++) {
      curTheaterArr.push(this.nearbyTheaters[i]);
    }
    this.theaterDataSource.data = curTheaterArr;
    this.theaterTable.renderRows();
  }

  pageChangeEvent(event: PageEvent) {
    this.curPageIndex = event.pageIndex;
    let curTheaterArr = [];
    for(let i = this.curPageIndex * 5; i < Math.min(this.pageSize * (this.curPageIndex + 1), this.nearbyTheaters.length); i++) {
      curTheaterArr.push(this.nearbyTheaters[i]);
    }
    this.theaterDataSource.data = curTheaterArr;
    this.theaterTable.renderRows();
  }
}
