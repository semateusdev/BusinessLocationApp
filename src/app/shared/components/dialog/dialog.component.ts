import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { DialogData } from '../../../core/services/dialog/dialog.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<DialogComponent>,
  ) {}


  close(result: 'accept' | 'cancel') {
    this.dialogRef.close(result);
  }

}
