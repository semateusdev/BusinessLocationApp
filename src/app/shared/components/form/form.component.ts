import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FieldsForm } from './form.interface';
import { MatButtonModule } from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, FormsModule, MatCheckboxModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit {

  @Input() fields: FieldsForm[] = [];
  @Output() sendData: EventEmitter<any> = new EventEmitter();
  @Output() cancelBtn: EventEmitter<void> = new EventEmitter();
  public form: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    
    const formControls: any = {};

    this.fields.forEach(field => {
      formControls[field.formControlKey] = ['', !!field.required ? Validators.required : []]
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
        this.form.get(control)?.setValue(field.url);
      }
    })
  }
}
