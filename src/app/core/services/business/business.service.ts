import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, map } from 'rxjs';
import { Business, ShortBusinessInfo } from '../../models/business.model';
import { DATA_MOCK } from './data-mock';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  private _idTemp = 1;

  constructor(
    private http: HttpClient
  ) { }

  
  get idTemp() : string {
    this._idTemp++;
    return `bs0${this._idTemp}`;
  }
  

  async getBusiness() {
    let response: ShortBusinessInfo[] = [];
    const currentBusinessData = localStorage.getItem('currentBusinessData');
    if(!currentBusinessData){
      const  headers = new HttpHeaders({
        'x-rapidapi-host': 'local-business-data.p.rapidapi.com',
        'x-rapidapi-key': 'caecd96f56msh69a61554b2f7ffep1b04e3jsnf926482a9b83'
      });
      let locationsDB: ShortBusinessInfo[] = [];
      try {
        locationsDB = await (lastValueFrom(
          this.http.get<ResponseRequest>(
            'https://local-business-data.p.rapidapi.com/search?query=Petshop&limit=50&lat=4.60971&lng=-74.08175&zoom=13&language=en&region=co&extract_emails_and_contacts=false', 
            {headers: headers}
          ).pipe(map(response => {
            return response.data.map((data): ShortBusinessInfo => {
              const newObject: ShortBusinessInfo = {
                id: data.business_id,
                name: data.name,
                city: data.city,
                rating: data.rating,
                phone_number: data.phone_number || 'Sin teléfono',
                open_24: data.opening_status === 'Open 24 hours' ? 'Si' : 'No',
                photo_url: data.photos_sample![0].photo_url ?? '',
                latitude: data.latitude,
                longitude: data.longitude,
                street_address: data.street_address,
                website: data.website ?? 'No tiene',
              };
              return newObject;
            })
          }))
        ));
      } catch (error) {
        
        locationsDB = DATA_MOCK;
      }  
      localStorage.setItem('currentBusinessData', JSON.stringify({data: locationsDB}));
      response = locationsDB;
      
    }
    else {
      const dataObject = JSON.parse(currentBusinessData);
      response = dataObject.data;      
    }
    return response;    
  }

  getCurrentData():  ShortBusinessInfo[] {
    let allData = localStorage.getItem('currentBusinessData');     
    return !allData
    ? this.getBusiness()
    : (JSON.parse(allData!)).data;
  }

  async getBusinessById(id: string) {
    const currentDataJSON = this.getCurrentData();
    const business = (currentDataJSON as ShortBusinessInfo[])
      .find(business => business.id === id);
    
    if (!business)
      throw new Error('Business not found');
    return business;
  }

  createBusiness(data: ShortBusinessInfo) {
    const currentDataJSON = this.getCurrentData();
    
    currentDataJSON.unshift(data);
    localStorage.setItem('currentBusinessData', JSON.stringify({data: currentDataJSON}));
  }

  editBusiness(data: ShortBusinessInfo) {
    const currentDataJSON = this.getCurrentData();

    for (let index = 0; index < currentDataJSON.length; index++) {
      if (currentDataJSON[index].id === data.id){
        currentDataJSON[index] = {...data};
      }
    }
    
    localStorage.setItem('currentBusinessData', JSON.stringify({data: currentDataJSON}));
  }

  deleteBusiness(id: string) {
    let currentDataJSON = this.getCurrentData();
    currentDataJSON = currentDataJSON.filter(data => data.id !== id);

    console.log(currentDataJSON);
    

    localStorage.setItem('currentBusinessData', JSON.stringify({data: currentDataJSON}));
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