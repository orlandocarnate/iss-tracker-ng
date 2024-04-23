import { Injectable } from '@angular/core';
import { convertToRadians } from '../utils/utils';
import * as THREE from 'three';
import { IData } from './IData';

@Injectable({
  providedIn: 'root'
})
export class DataFetchService {

  constructor() { }

  public async fetchISSData(): Promise<IData> {
    try {
      const response = await fetch("https://api.wheretheiss.at/v1/satellites/25544");
      const data = await response.json();
  
      return data;
    }
    catch (err) {
      console.log(`API Error: ${err}`);
      throw err; // needed for Promise<IData> since we need to return something
    }
    
  }
}
