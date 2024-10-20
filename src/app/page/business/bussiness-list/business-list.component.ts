import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { TableComponent } from '../../../shared/components/table/table.component';
import { TableActions, TableColumn, TableData } from '../../../shared/interface/table.interface';
import { BusinessService } from '../../../core/services/business/business.service';
import { Router } from '@angular/router';
import { ShortBusinessInfo } from '../../../core/models/business.model';
import { DialogService } from '../../../core/services/dialog/dialog.service';
import { DataCardComponent } from '../../../shared/components/data-card/data-card.component';
import { CommonModule } from '@angular/common';
import { MobileTableComponent } from '../../../shared/components/mobile-business-table/mobile-table.component';

@Component({
  selector: 'app-locations-list',
  standalone: true,
  imports: [HeaderComponent, TableComponent, DataCardComponent, CommonModule, MobileTableComponent],
  templateUrl: './business-list.component.html',
  styleUrl: './business-list.component.scss'
})
export class BusinessListComponent implements OnInit{

  @ViewChild('detail') detailTemplate!: TemplateRef<any>;
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
  public selectedBusiness!: ShortBusinessInfo;
  readonly window = window;


  constructor(
    private businessService: BusinessService,
    private router: Router,
    private dialogService: DialogService,
  ) {
  }


  async ngOnInit() {
    this.getBusiness();
  }

  async getBusiness() {
    this.business = await this.businessService.getBusiness();
    this.tableData = this.business as unknown as TableData[];
  }

  
  goToCreate() {
    this.router.navigateByUrl('/business/create')
  }

  async getTableAction({action, item}: {action: TableActions, item: TableData | ShortBusinessInfo}) {
    console.log(action, item);
    switch (action.id) {
      case 'view':
        this.selectedBusiness = item as ShortBusinessInfo;
        this.dialogService.openDialog({
          title: 'Detalle de Petshop',
          template: this.detailTemplate
        });
        break;
      
      case 'edit':
        this.router.navigateByUrl(`/business/edit/${item['id']}`)
        break;

      case 'delete':
        const result = await this.dialogService.openDialog({
          title: 'Eliminar de Petshop',
          text: `¿Estas seguro que deseas eliminar ${(item as ShortBusinessInfo).name}?`
        });
        if (result === 'accept') {
          this.businessService.deleteBusiness((item as ShortBusinessInfo).id);
          this.getBusiness();
        }
        
        break;    
      default:
        break;
    }
  }

}