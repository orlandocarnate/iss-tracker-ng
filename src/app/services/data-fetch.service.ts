import { Injectable } from '@angular/core';
import { convertToRadians } from '../utils/utils';
import * as THREE from 'three';
import { IData } from './IData';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataFetchService {
  constructor(private http: HttpClient) { }

  public getISSData(): Observable<IData> {
    return this.http.get<IData>("https://api.wheretheiss.at/v1/satellites/25544");
  }
}
