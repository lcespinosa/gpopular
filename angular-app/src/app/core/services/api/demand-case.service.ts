import { Injectable } from '@angular/core';

import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import {DemandCase} from '../../models/demand_case';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class DemandCaseService {

  url = '/nomenclature/demand_cases';

  constructor(private http: HttpClient) { }

  getDemandCases(): Observable<DemandCase[]> {
    return this.http.get<DemandCase[]>(environment.apiUrl + this.url)
      .pipe(
        tap(cpopular => console.log('fetched tipo de demanda')),
      );
  }

  getDemandCase(id: number): Observable<DemandCase> {
    return this.http.get<DemandCase>(environment.apiUrl + this.url + `/${id}`)
      .pipe(
        tap(_ => console.log(`fetched tipo de demanda id=${id}`)),
      );
  }

  addDemandCase(demand: DemandCase): Observable<DemandCase> {
    return this.http.post<DemandCase>(environment.apiUrl + this.url, demand, httpOptions)
      .pipe(
        tap((dem: DemandCase) => console.log(`added tipo de demanda w/ id=${dem.id}`))
      );
  }

  updateDemandCase(id: number, demand: DemandCase): Observable<DemandCase> {
    return this.http.put<DemandCase>(environment.apiUrl + this.url + `/${id}`, demand, httpOptions)
      .pipe(
        tap(_ => console.log(`updated tipo de demanda id=${id}`)),
      );
  }

  deleteDemandCase(id: number): Observable<DemandCase> {
    return this.http.delete<DemandCase>(environment.apiUrl + this.url + `/${id}`, httpOptions)
      .pipe(
        tap(_ => console.log(`deleted tipo de demanda ${id}`)),
      );
  }
}
