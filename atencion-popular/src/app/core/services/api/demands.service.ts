import { Injectable } from '@angular/core';

import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import {Demand} from '../../models/demand';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class DemandsService {

  url = '/management/demands';

  constructor(private http: HttpClient) { }

  getDemands(): Observable<Demand[]> {
    return this.http.get<Demand[]>(environment.apiUrl + this.url)
      .pipe(
        tap(demand => console.log('fetched demanda')),
      );
  }

  getDemand(id: number): Observable<Demand> {
    return this.http.get<Demand>(environment.apiUrl + this.url + `/${id}`)
      .pipe(
        tap(_ => console.log(`fetched demanda id=${id}`)),
      );
  }

  addDemand(demand: Demand): Observable<Demand> {
    return this.http.post<Demand>(environment.apiUrl + this.url, demand, httpOptions)
      .pipe(
        tap((dem: Demand) => console.log(`added demanda w/ id=${dem.id}`))
      );
  }

  updateDemand(id: number, demand: Demand): Observable<Demand> {
    return this.http.put<Demand>(environment.apiUrl + this.url + `/${id}`, demand, httpOptions)
      .pipe(
        tap(_ => console.log(`updated demanda id=${id}`)),
      );
  }

  deleteDemand(id: number): Observable<Demand> {
    return this.http.delete<Demand>(environment.apiUrl + this.url + `/${id}`, httpOptions)
      .pipe(
        tap(_ => console.log(`deleted demanda ${id}`)),
      );
  }
}
