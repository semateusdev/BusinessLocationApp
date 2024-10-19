import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FormComponent } from '../../../shared/components/form/form.component';
import { FieldsForm } from '../../../shared/components/form/form.interface';
import { Item } from '../../../shared/interface/items.interface';
import { BusinessService } from '../../../core/services/business/business.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-location',
  standalone: true,
  imports: [MatIconModule, FormComponent],
  templateUrl: './create-business.component.html',
  styleUrl: './create-business.component.scss'
})
export class CreateBusinessComponent {

  public cities: Item[] = [
    {id: 0, name: 'Bogota'},
    {id: 1, name: 'Cartagena'},
    {id: 2, name: 'Cali'},
    {id: 3, name: 'Manizales'},
  ]

  public formFields: FieldsForm[] = [
    {label: 'Nombre', type: 'input', placeholder: 'Escriba nombre de petshop', required: true, formControlKey: 'name'},
    {label: 'Telefono', type: 'input', inputType: 'number', placeholder: 'Escriba el telefono de petshop', required: true, formControlKey: 'phone_number'},
    {label: 'Dirección', type: 'input', inputType: 'text', placeholder: 'Escriba la dirección del petshop', required: true, formControlKey: 'street_address'},
    {label: 'Ciudad', type: 'select', inputType: 'text', placeholder: 'Seleccione la ciudad del petshop', required: true, formControlKey: 'city', selectOptions: this.cities},
    {label: 'Calificación', type: 'input', inputType: 'number', placeholder: 'Escriba la calificación del petshop', formControlKey: 'rating'},
    {label: 'Pagina web', type: 'input', inputType: 'text', placeholder: 'Escriba la pagina web del petshop', formControlKey: 'website'},
    {label: 'Latitud', type: 'input', inputType: 'number', placeholder: 'Escriba la latitud del petshop', formControlKey: 'latitude'},
    {label: 'Longitud', type: 'input', inputType: 'number', placeholder: 'Escriba la longitud del petshop', formControlKey: 'longitude'},
    {label: '¿Esta abierto 24 horas?', type: 'checkbox', formControlKey: 'open_24'},
    {label: 'Imagen de referencia', type: 'image', formControlKey: 'photo_url'},
  ];

  constructor(
    private businessService: BusinessService,
    private router: Router
  ) {}
  
  create(data: any) {
    console.log(data);
    
    this.businessService.createBusiness({
      ...data,
      open_24: !data.open_24 ? 'No' : 'Si'
    }) 
    this.backSection();
  }

  backSection() {
    this.router.navigateByUrl('/business')
  }
}
