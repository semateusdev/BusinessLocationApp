import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FieldsForm } from './form.interface';
import { MatButtonModule } from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { ErrorImageDirective } from '../../directives/error-image.directive';
import { ValidatorsService } from '../../../core/services/validators/validators.service';


@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, 
    FormsModule, MatCheckboxModule, CommonModule, ErrorImageDirective],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnChanges {

  @Input() fields: FieldsForm[] = [];
  @Input() saveButtonText: string = 'Guardar'
  @Output() sendData: EventEmitter<any> = new EventEmitter();
  @Output() cancelBtn: EventEmitter<void> = new EventEmitter();
  public form: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private validatosService: ValidatorsService
  ) {
  }

  ngOnChanges(): void {
    
    const formControls: any = {};

    this.fields.forEach(field => {
      if(field.formControlKey === 'phone_number' && field.value){
        field.value = field.value?.toString().replace('+57', '');        
      }else if(field.type === 'image' && typeof field.value === 'string') {
        field.url = field.value
      }else if(field.type === 'checkbox' && typeof field.value === 'string') {
        field.value = field.value === 'Si';
      }
      formControls[field.formControlKey] = [field.value, field.validators]
    });

    this.form = this.fb.group(formControls);
  }

  saveData() {    
    if(this.form.valid){
      this.sendData.emit(this.form.value);
    }
  }

  setImage(event: Event, control: string) {
    if((!(event.target as HTMLInputElement).files?.length)){
      return;
    }
    const file = (event.target as HTMLInputElement).files![0];
    this.fields.forEach(field => {
      if (field.formControlKey === control){
        field.url = URL.createObjectURL(file)
        this.form.get(control)?.setValue(file);
      }
    })    
  }

  validateInput(event: Event, type: string) {
    if (type === 'number') {
      return this.validatosService.numberOnly(event);
    }
    return;
  }

}
