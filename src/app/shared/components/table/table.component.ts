import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table'; 
import {MatInputModule} from '@angular/material/input'; 
import { MatButtonModule } from '@angular/material/button';
import { TableData, TableColumn, TableActions } from '../../interface/table.interface';
import {MatIconModule} from '@angular/material/icon'; 
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule, MatInputModule, MatButtonModule, MatIconModule, ReactiveFormsModule, MatSortModule, MatPaginatorModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  host: {class: 'flex'}
})
export class TableComponent implements OnChanges{

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Input() headerData: TableColumn[] = [];
  @Input() tableData: TableData[] = [];
  @Input() tableActions: TableActions[] = [];
  @Output() eventAdd: EventEmitter<void> = new EventEmitter();
  @Output() selectedAction: EventEmitter<{action: TableActions, item: TableData}> = new EventEmitter();
  public searchInput: FormControl = new FormControl();
  
  displayedColumns: string[] = [];
  dataSource: MatTableDataSource<TableData> = new MatTableDataSource();

  ngOnChanges(changes: SimpleChanges): void {
    this.displayedColumns = this.headerData.map(data => data.key);
    this.dataSource = new MatTableDataSource(this.tableData); 
     

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter() {
    const filterValue = this.searchInput.value;
    this.dataSource.filter = !filterValue ? '' : filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  selectAction(action: TableActions, item: TableData) {
    this.selectedAction.emit({action, item});
  }
  

}
