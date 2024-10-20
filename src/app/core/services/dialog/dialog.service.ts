import { Injectable, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../../shared/components/dialog/dialog.component';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    private dialog: MatDialog
  ) { }

  openDialog(data: DialogData) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data,
      autoFocus: false,
    })
    return lastValueFrom(dialogRef.afterClosed());
    
  }
}

export interface DialogData {
  title: string;
  template?: TemplateRef<any>;
  text?: string;
  buttonAccept?: string;
  buttonCancel?: string;
  hideElements?: {
    buttonAccept?: boolean;
    buttonCancel?: boolean;
  }
}