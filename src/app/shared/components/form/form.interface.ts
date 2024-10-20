import { FormControl, Validators } from "@angular/forms";
import { Item } from "../../interface/items.interface";

export interface FieldsForm {
    //formNameControl: string;
    type: 'input' | 'select' | 'textArea' | 'checkbox' | 'image';
    label: string;
    formControlKey: string;
    placeholder?: string;
    inputType?: 'text' | 'password' | 'number' | 'email';
    selectOptions?: Item[];
    validators: Validators[];
    url?: string;
    value?: string | number | boolean | null;
}