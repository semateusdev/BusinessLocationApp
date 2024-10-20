import { Component, EventEmitter, Input, Output } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import { TableActions } from '../../interface/table.interface';
import { MatIconModule } from '@angular/material/icon';
import { ShortBusinessInfo } from '../../../core/models/business.model';
import { ErrorImageDirective } from '../../directives/error-image.directive';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-mobile-table',
  standalone: true,
  imports: [MatExpansionModule, MatIconModule, ErrorImageDirective, MatButtonModule],
  templateUrl: './mobile-table.component.html',
  styleUrl: './mobile-table.component.scss'
})
export class MobileTableComponent {

  @Input() tableActions: TableActions[] = [];
  @Input() businessList: ShortBusinessInfo[] = [];
  @Output() selectedAction: EventEmitter<{action: TableActions, item: ShortBusinessInfo}> = new EventEmitter();

  constructor(
    private router: Router
  ) {}

  selectAction(event: MouseEvent, action: TableActions, item: ShortBusinessInfo) {
    event.stopPropagation();
    this.selectedAction.emit({action, item});
  }

  goCreate() {
    this.router.navigateByUrl('/business/create')
  }

}
