import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FormComponent } from '../../../shared/components/form/form.component';
import { FieldsForm } from '../../../shared/components/form/form.interface';
import { Item } from '../../../shared/interface/items.interface';
import { BusinessService } from '../../../core/services/business/business.service';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShortBusinessInfo } from '../../../core/models/business.model';
import { ImagesService } from '../../../core/services/images/images.service';
import { ValidatorsService } from '../../../core/services/validators/validators.service';

@Component({
  selector: 'app-create-location',
  standalone: true,
  imports: [MatIconModule, FormComponent],
  templateUrl: './create-business.component.html',
  styleUrl: './create-business.component.scss'
})
export class CreateBusinessComponent implements OnInit {

  public cities: Item[] = [
    {id: 0, name: 'Bogotá'},
    {id: 1, name: 'Bucaramanga'},
    {id: 1, name: 'Barranquilla'},
    {id: 2, name: 'Medellín, Laureles - Estadio, Medellin'},
    {id: 3, name: 'Cali'},
    {id: 3, name: 'Soacha'},
    {id: 3, name: 'Santa Marta'},
    {id: 3, name: 'Piedecuesta'},
    {id: 3, name: 'Cúcuta, Cucuta'},
    {id: 3, name: 'Pereira'},
  ]

  public formFields: FieldsForm[] = [
    {label: 'Nombre', type: 'input', placeholder: 'Escriba nombre de petshop', validators: [Validators.required], formControlKey: 'name'},
    {label: 'Teléfono', type: 'input', inputType: 'number', placeholder: 'Escriba el telefono de petshop', validators: [Validators.required, Validators.maxLength(10)], formControlKey: 'phone_number'},
    {label: 'Dirección', type: 'input', inputType: 'text', placeholder: 'Escriba la dirección del petshop', validators: [Validators.required], formControlKey: 'street_address'},
    {label: 'Ciudad', type: 'select', inputType: 'text', placeholder: 'Seleccione la ciudad del petshop', validators: [Validators.required], formControlKey: 'city', selectOptions: this.cities},
    {label: 'Calificación', type: 'input', inputType: 'number', placeholder: 'Escriba la calificación del petshop', formControlKey: 'rating', validators: [Validators.max(5)]},
    {label: 'Página web', type: 'input', inputType: 'text', placeholder: 'Escriba la pagina web del petshop', formControlKey: 'website', validators: []},
    {label: 'Latitud', type: 'input', inputType: 'number', placeholder: 'Escriba la latitud del petshop', formControlKey: 'latitude', validators: [Validators.pattern(this.validatorsService.latitudeValidator)]},
    {label: 'Longitud', type: 'input', inputType: 'number', placeholder: 'Escriba la longitud del petshop', formControlKey: 'longitude', validators: [Validators.pattern(this.validatorsService.longitudeValidator)]},
    {label: '¿Esta abierto 24 horas?', type: 'checkbox', formControlKey: 'open_24', validators: []},
    {label: 'Imagen de referencia', type: 'image', formControlKey: 'photo_url', validators: []},
  ];
  public businessId: string | null = null;
  public businessToEdit!: ShortBusinessInfo;
  public type: 'edit' | 'create' = 'create';
  public title: string = 'Registrar Nuevo Petshop';
  public txtButton: string = 'Guardar';

  constructor(
    private businessService: BusinessService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private imageService: ImagesService,
    private validatorsService: ValidatorsService
  ) {
    this.route.paramMap.subscribe(params => {
      this.businessId = params.get('id');
      if (this.businessId) {
        this.type = 'edit';
        this.setEditData();
        this.title = 'Editar Petshop'
        this.txtButton = 'Editar'
      }      
    })
  }

  ngOnInit(): void {
    
  }
  
  saveData(data: any) {    
    if (this.type === 'create') {
      const newData = {
        ...data,
        id: this.businessService.idTemp,
        open_24: !data.open_24 ? 'No' : 'Si',
        phone_number: `+57${data.phone_number}`
      }
      this.businessService.createBusiness(newData);
      this.imageService.imagesList.push({
        id: newData.id,
        file: data.photo_url
      });
    }else if(this.businessId){
      this.businessService.editBusiness({
        ...data,
        open_24: !data.open_24 ? 'No' : 'Si',
        id: this.businessId,
        phone_number: `+57${data.phone_number}`
      })
      this.imageService.imagesList.push({
        id: this.businessId,
        file: data.photo_url
      });
    }
    this.backSection();
  }

  backSection() {
    this.router.navigateByUrl('/business')
  }

  async setEditData() {
    this.businessToEdit = await this.businessService.getBusinessById(this.businessId!);

    this.formFields.forEach(field => {
      field.value = this.businessToEdit[field.formControlKey]
      if (field.formControlKey === 'photo_url') {
        const image = this.imageService.imagesList.find(image => image.id === this.businessId);
        if (image)   
          field.value = URL.createObjectURL(image.file)
      }
    })
  }
}
