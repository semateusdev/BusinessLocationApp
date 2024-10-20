import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Deck, log, MapView, PickingInfo } from '@deck.gl/core/typed';
import {TileLayer} from '@deck.gl/geo-layers/typed';
import {BitmapLayer, IconLayer} from "@deck.gl/layers/typed";
import { HeaderComponent } from '../../shared/components/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import {CdkDrag, CdkDragHandle} from '@angular/cdk/drag-drop';
import { BusinessService } from '../../core/services/business/business.service';
import { ShortBusinessInfo } from '../../core/models/business.model';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [HeaderComponent, MatIconModule, CdkDrag, CdkDragHandle],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements OnInit, AfterViewInit{

  @ViewChild('map') map!: ElementRef<HTMLCanvasElement>;
  private deck!: Deck;
  public currentViewState!: MapSetupInput['initialViewState'];
  public business: ShortBusinessInfo[] = [];

  constructor(
    private businessService: BusinessService
  ) {}

  ngOnInit(): void {
  }

  async ngAfterViewInit() {

    await this.getBusiness();

    this.createMap({
      initialViewState: {
        latitude: 4.60971,
        longitude: -74.08175,
        zoom: 10,
        bearing: 0,
        pitch: 30,
        maxPitch: 89,
      }
    });
  }

  createMap(setup: MapSetupInput) {

    this.map.nativeElement.addEventListener('contextmenu', event => event.preventDefault());
    this.currentViewState = {
      ...setup.initialViewState,
    };

    const tile = new TileLayer({
      id: 'map',
      data: 'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png',
      maxZoom: 19,
      minZoom: 0,
      renderSubLayers: (props) => {
        const {
          bbox: {west, south, east, north}
        } = props.tile as TilePros;

        return new BitmapLayer(props, {
          data: undefined,
          image: props.data,
          bounds: [west, south, east, north]
        });
      }
    })


    const icons: IconLayer[] = [];  
    
    this.business.forEach(data => {
      const ICON_MAPPING = {
        marker: {x: 0, y: 0, width: 48, height: 60, mask: false}
      };
      const layer = new IconLayer({
        id: `businessIcon-${data.id}`,
        data: this.business,
        getIcon: d => 'marker',
        getPosition: d => [d.longitude, d.latitude],
        getSize: 30,
        iconAtlas: 'assets/svg/pet.svg',
        iconMapping: ICON_MAPPING,
        pickable: true
      })
      icons.push(layer);
    })
    

    this.deck = new Deck({
      canvas: this.map.nativeElement,
      initialViewState: this.currentViewState,
      onViewStateChange: this.onViewStateChange.bind(this),
      controller: true,
      views: [
        new MapView({
          id: 'main'
        }),
      ],
      layers: [tile, ...icons],
      getTooltip: (info) => {
        if (info.object) {
          return {
            html: `<p class="text-secondary font-bold text-subtitle-xs capitalize !m-0">${info.object.name}</p>`
          }
        }
        return null;
      },
    })
  }

  private onViewStateChange(params: { viewState: unknown }) {
    this.currentViewState = params.viewState as MapSetupInput['initialViewState'];
  }

  centerCoordinate(latitude: number,longitude: number, zoom: number) {
    this.deck.setProps({
      initialViewState: {
        ...this.currentViewState,
        latitude,
        longitude,
        zoom,
        transitionDuration: 2000,
      }
    });
  }

  async getBusiness() {
    this.business = await this.businessService.getBusiness();    
  }

  centerBusiness(business: ShortBusinessInfo) {
    this.centerCoordinate(business.latitude, business.longitude, 15)
  }

}
export interface MapSetupInput {
  initialViewState: {
      altitude?: number,
      latitude: number,
      longitude: number,
      zoom: number,
      bearing: number,
      pitch: number,
      maxPitch: number
      minZoom?: number
  }
}
export interface TilePros {
  bbox: {
      west: number,
      south: number,
      east: number,
      north: number
  }
}