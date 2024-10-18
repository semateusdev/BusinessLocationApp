import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  constructor(
    private http: HttpClient
  ) { }

  getLocations() {
    const headers = new HttpHeaders({
      'x-rapidapi-host': 'local-business-data.p.rapidapi.com',
      'x-rapidapi-key': '1a1a064913mshe61c51698642c5dp1b3efbjsnf70454ee105b'
    });
    return this.http.get(
      'https://local-business-data.p.rapidapi.com/business-details?business_id=0x880fd393d427a591%3A0x8cba02d713a995ed&extract_emails_and_contacts=true&extract_share_link=fa', 
      {headers: headers}
    );
    
  }
}
