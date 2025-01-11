import { Component, Input, ViewChild } from '@angular/core';
import { Theater } from '../../models/theater.model';
import { CommonModule,  } from '@angular/common';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-theaterlist',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule],
  templateUrl: './theaterlist.component.html',
  styleUrl: './theaterlist.component.css'
})
export class TheaterlistComponent {
  @Input() nearbyTheaters: [Theater, number][] = [];
  theaterDataSource = new MatTableDataSource(this.nearbyTheaters);
  @ViewChild(MatTable) theaterTable!: MatTable<any>;

  displayedColumns = ['name', 'address'];
  ngOnInit(): void {
    this.theaterTable.renderRows();
  }
  //TODO: Get pagination working properly
}
