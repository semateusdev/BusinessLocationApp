import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { TableComponent } from '../../../shared/components/table/table.component';
import { TableActions, TableColumn } from '../../../shared/interface/table.interface';
import { LocationsService } from '../../../core/services/locations.service';

@Component({
  selector: 'app-locations-list',
  standalone: true,
  imports: [HeaderComponent, TableComponent],
  templateUrl: './locations-list.component.html',
  styleUrl: './locations-list.component.scss'
})
export class LocationsListComponent implements OnInit{

  public title: string = 'Ubicación de Negocios y/o Empresas';
  public locations: any[] = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
    {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  ];
  public tableHeader: TableColumn[] = [
    {key: 'position', title: 'Posición'}, {key: 'name', title: 'Nombre'}, 
    {key: 'weight', title: 'Peso'}, {key: 'symbol', title: 'Simbolo'},
    {key: 'actions', title: 'Acciones'}
  ];
  public tableActions: TableActions[] = [
    {id: 'view', tooltip: 'Ver', iconName: 'visibility'}, {id: 'delete', tooltip: 'Eliminar', iconName: 'delete'}
  ];

  constructor(
    private locationsServices: LocationsService
  ) {
  }

  async ngOnInit() {
    console.log(await this.locationsServices.getLocations());
    
  }

}
