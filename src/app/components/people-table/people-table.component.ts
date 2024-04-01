import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Person } from 'src/models';
import { People } from 'src/app/data';


@Component({
  selector: 'app-people-table',
  standalone: true,
  imports: [CommonModule ,MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule],
  templateUrl: './people-table.component.html',
  styleUrls: ['./people-table.component.scss']
})


export class PeopleTableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'category', 'company', 'levelOfHappiness'];
  dataSource: MatTableDataSource<Person>;

  // El static: true asegura que los eleementos ViewChild se inicialicen cuando se carga el componente
  // El ! indica a Typescript que confie en que estas variables no serán nulas o indefinidas en tiempo de ejecución
  @ViewChild(MatPaginator, {static: true} ) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;

  constructor() {

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(People);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  ngOnInit(): void {
    
  }

}
