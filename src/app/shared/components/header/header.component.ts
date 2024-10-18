import { Component } from '@angular/core';
import { ItemWithAdditionalData } from '../../interface/items.interface';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  public options: ItemWithAdditionalData<{url: string}>[] = [
    {id: HeaderOptions.HOME, name: 'Inicio',data: {url: '/home'}},
    {id: HeaderOptions.TABLE, name: 'Datos',data: {url: '/locations'}},
    {id: HeaderOptions.MAP, name: 'Mapa',data: {url: '/map'}},
  ]

}

enum HeaderOptions {
  HOME,
  TABLE,
  MAP
}