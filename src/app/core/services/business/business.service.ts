import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, map } from 'rxjs';
import { Business, ShortBusinessInfo } from './locations.interface';
import { DATA_MOCK } from './data-mock';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  constructor(
    private http: HttpClient
  ) { }

  async getBusiness() {
    let response: ShortBusinessInfo[] = [];
    const currentBusinessData = localStorage.getItem('currentBusinessData');
    if(!currentBusinessData){
      const  headers = new HttpHeaders({
        'x-rapidapi-host': 'local-business-data.p.rapidapi.com',
        'x-rapidapi-key': 'caecd96f56msh69a61554b2f7ffep1b04e3jsnf926482a9b83'
      });
      console.log('if');
      
      /*const locationsDB: ShortBusinessInfo[] = await (lastValueFrom(
        this.http.get<ResponseRequest>(
          'https://local-business-data.p.rapidapi.com/search?query=Petshop&limit=50&lat=4.60971&lng=-74.08175&zoom=13&language=en&region=co&extract_emails_and_contacts=false', 
          {headers: headers}
        ).pipe(map(response => {
          return response.data.map((data): ShortBusinessInfo => {
            const newObject: ShortBusinessInfo = {
              name: data.name,
              city: data.city,
              rating: data.rating,
              phone_number: data.phone_number || 'Sin teléfono',
              open_24: data.opening_status === 'Open 24 hours' ? 'Si' : 'No',
              photo_url: data.photos_sample![0].photo_url ?? '',
              latitude: data.latitude,
              longitude: data.longitude,
              street_address: data.street_address
              website: data.website
            };
            return newObject;
          })
        }))
      ));*/      
      const locationsDB = DATA_MOCK;
      localStorage.setItem('currentBusinessData', JSON.stringify({data: locationsDB}));
      response = locationsDB;
      
    }
    else {
      const dataObject = JSON.parse(currentBusinessData);
      response = dataObject.data;
      console.log(response);
      console.log('else');
      
    }
    return response;    
  }

  createBusiness(data: ShortBusinessInfo) {
    const currentData = localStorage.getItem('currentBusinessData');    
    if(!currentData){
      this.getBusiness();
      this.createBusiness(data);
      return;
    }
    const currentDataJSON = JSON.parse(currentData);
    currentDataJSON.data.unshift(data);
    localStorage.setItem('currentBusinessData', JSON.stringify(currentDataJSON));
    console.log(currentDataJSON);
  }

}

export interface ResponseRequest {
  status:string;
  request_id:string;
  data: Business[];
  parameters?: {
    query: string;
    language: string;
    region: string;
    lat: number;
    lng:number
    zoom:number
    limit:number
  }
}