import { Injectable } from '@angular/core';

import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import {Way} from '../../models/way';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class WayService {

  url = '/nomenclature/ways';

  constructor(private http: HttpClient) { }

  getWays(): Observable<Way[]> {
    return this.http.get<Way[]>(environment.apiUrl + this.url)
      .pipe(
        tap(way => console.log('fetched vias')),
      );
  }

  getWay(id: number): Observable<Way> {
    return this.http.get<Way>(environment.apiUrl + this.url + `/${id}`)
      .pipe(
        tap(_ => console.log(`fetched via id=${id}`)),
      );
  }

  addWay(way: Way): Observable<Way> {
    return this.http.post<Way>(environment.apiUrl + this.url, way, httpOptions)
      .pipe(
        tap((w: Way) => console.log(`added via w/ id=${w.id}`))
      );
  }

  updateWay(id: number, way: Way): Observable<Way> {
    return this.http.put<Way>(environment.apiUrl + this.url + `/${id}`, way, httpOptions)
      .pipe(
        tap(_ => console.log(`updated via id=${id}`)),
      );
  }

  deleteWay(id: number): Observable<Way> {
    return this.http.delete<Way>(environment.apiUrl + this.url + `/${id}`, httpOptions)
      .pipe(
        tap(_ => console.log(`deleted via ${id}`)),
      );
  }
}
