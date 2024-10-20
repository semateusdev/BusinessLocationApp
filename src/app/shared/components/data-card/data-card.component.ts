import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ErrorImageDirective } from '../../directives/error-image.directive';
import { ShortBusinessInfo } from '../../../core/models/business.model';
import { Item } from '../../interface/items.interface';
import { MatButtonModule } from '@angular/material/button';
import { ImagesService } from '../../../core/services/images/images.service';

@Component({
  selector: 'app-data-card',
  standalone: true,
  imports: [ErrorImageDirective, MatButtonModule],
  templateUrl: './data-card.component.html',
  styleUrl: './data-card.component.scss'
})
export class DataCardComponent implements OnChanges {

  @Input() businessData!: ShortBusinessInfo;
  private labels: Item[] = [
    {id: 'phone_number', name: 'Teléfono'}, {id: 'street_address', name: 'Dirección'},
    {id: 'city', name: 'Ciudad'}, 
    {id: 'website', name: 'Página web'}
  ]
  public dataField: DataField[] = [];

  constructor(
    private imageService: ImagesService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.labels.forEach(label => {
      const data: DataField = {
        label: label.name,
        value: this.businessData[label.id] ?? 'Sin datos'
      }
      this.dataField.push(data);
    })

    const image = this.imageService.imagesList.find(image => image.id === this.businessData.id);
    if(image)
      this.businessData.photo_url = URL.createObjectURL(image?.file)
  }
  

}
interface DataField {
  label: string; 
  value: string | number;
}