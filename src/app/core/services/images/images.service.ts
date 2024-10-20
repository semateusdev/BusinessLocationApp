import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  public imagesList: LocalImages[] = []

  constructor() { }
}

export interface LocalImages {
  id: string;
  file: File
}
