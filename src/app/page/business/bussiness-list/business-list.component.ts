import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { TableComponent } from '../../../shared/components/table/table.component';
import { TableActions, TableColumn, TableData } from '../../../shared/interface/table.interface';
import { BusinessService } from '../../../core/services/business/business.service';
import { Router } from '@angular/router';
import { ShortBusinessInfo } from '../../../core/services/business/locations.interface';

@Component({
  selector: 'app-locations-list',
  standalone: true,
  imports: [HeaderComponent, TableComponent],
  templateUrl: './business-list.component.html',
  styleUrl: './business-list.component.scss'
})
export class BusinessListComponent implements OnInit{

  public title: string = 'Petshop en Colombia';
  public tableData: TableData[] = [];
  public business: ShortBusinessInfo[] = [];
  public tableHeader: TableColumn[] = [
    {key: 'name', title: 'Nombre'}, {key: 'phone_number', title: 'Número de teléfono'}, 
    {key: 'street_address', title: 'Dirección'}, {key: 'city', title: 'Ciudad'},
    {key: 'open_24', title: 'Abierto 24 horas'}, {key: 'actions', title: 'Acciones'}
  ];
  public tableActions: TableActions[] = [
    {id: 'view', tooltip: 'Ver', iconName: 'visibility'}, {id: 'edit', tooltip: 'Editar', iconName: 'edit'},
    {id: 'delete', tooltip: 'Eliminar', iconName: 'delete'}
  ];


  constructor(
    private locationsServices: BusinessService,
    private router: Router
  ) {
  }


  async ngOnInit() {
    this.getBusiness();
  }

  async getBusiness() {
    this.business = await this.locationsServices.getBusiness();
    console.log(this.business);
    
    this.tableData = this.business as unknown as TableData[];
    console.log(this.tableData);
    
  }

  
  goToCreate() {
    this.router.navigateByUrl('/business/create')
  }



}