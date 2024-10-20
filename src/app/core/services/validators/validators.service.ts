import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  private _latitudeValidator: RegExp = /^([+-]?(90(\.0{1,20})?|([0-8]?\d)(\.\d{1,20})?))$/
  private _longitudeValidator: RegExp = /^([+-]?(180(\.0{1,20})?|((1[0-7]\d)|([1-9]?\d))(\.\d{1,20})?))$/


  constructor() { }

  get latitudeValidator() {
    return this._latitudeValidator;
  }

  get longitudeValidator() {
    return this._longitudeValidator;
  }

  public numberOnly(event: any): boolean {
    const MIN_CHARCODE = 57;
    const MIN_NUMPAD = 96;
    const MAX_NUMPAD = 105;
    const SPACE_NUMPAD = 32;
    const SUBTRACT = 109;
    const charCode = (event.which) ? event.which : event.keyCode;
    console.log(event);
    
    if (charCode > MIN_CHARCODE && (charCode < MIN_NUMPAD || charCode > MAX_NUMPAD) && charCode !== SUBTRACT || charCode === SPACE_NUMPAD) {
      return false;
    }
    return true;
  }

}
