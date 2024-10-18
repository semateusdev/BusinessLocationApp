import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table'; 
import {MatInputModule} from '@angular/material/input'; 
import { MatButtonModule } from '@angular/material/button';
import { TableData, TableColumn, TableActions } from '../../interface/table.interface';
import {MatIconModule} from '@angular/material/icon'; 
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule, MatInputModule, MatButtonModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  host: {class: 'flex'}
})
export class TableComponent implements OnChanges{

  @Input() headerData: TableColumn[] = [];
  @Input() tableData: TableData[] = [];
  @Input() tableActions: TableActions[] = [];
  public searchInput: FormControl = new FormControl();
  
  displayedColumns: string[] = [];
  dataSource: MatTableDataSource<TableData> = new MatTableDataSource();

  ngOnChanges(changes: SimpleChanges): void {
    this.displayedColumns = this.headerData.map(data => data.key);
    this.dataSource = new MatTableDataSource(this.tableData);  
  }

  applyFilter() {
    const filterValue = this.searchInput.value;
    console.log(filterValue);
    
    this.dataSource.filter = !filterValue ? '' : filterValue.trim().toLowerCase();
  }

}
