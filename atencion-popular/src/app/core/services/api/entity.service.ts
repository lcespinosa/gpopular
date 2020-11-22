import { Injectable } from '@angular/core';

import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

import { Entity } from '../../models/entity';
import {environment} from '../../../../environments/environment';
import {Topic} from '../../models/topic';
import {Functionary} from '../../models/functionary';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class EntityService {

  url = '/nomenclature/agencies';

  constructor(private http: HttpClient) { }

  getEntities(): Observable<Entity[]> {
    return this.http.get<Entity[]>(environment.apiUrl + this.url)
      .pipe(
        tap(entities => console.log('fetched agencies')),
      );
  }

  getEntity(id: number): Observable<Entity> {
    return this.http.get<Entity>(environment.apiUrl + this.url + `/${id}`)
      .pipe(
        tap(_ => console.log('fetched agency')),
      );
  }

  addEntity(entity: Entity): Observable<Entity> {
    return this.http.post<Entity>(environment.apiUrl + this.url, entity, httpOptions)
      .pipe(
        tap((ent: Entity) => console.log(`added agency w/ id=${ent.id}`)),
      );
  }

  updateEntity(id: number, entity: Entity): Observable<Entity> {
    return this.http.put<Entity>(environment.apiUrl + this.url + `/${id}`, entity, httpOptions)
      .pipe(
        tap(_ => console.log(`updated agency id=${id}`))
      );
  }

  deleteEntity(id: number): Observable<Entity> {
    return this.http.delete<Entity>(environment.apiUrl + this.url + `/${id}`)
      .pipe(
        tap(_ => console.log(`deleted agency ${id}`))
      );
  }

  getTopics(id: number): Observable<Topic[]> {
    return this.http.get<Topic[]>(environment.apiUrl + this.url + `/${id}/topics`)
      .pipe(
        tap(topics => console.log('fetched topics')),
      );
  }

  getFunctionaries(id: number): Observable<Functionary[]> {
    return this.http.get<Functionary[]>(environment.apiUrl + this.url + `/${id}/functionaries`)
      .pipe(
        tap(functionaries => console.log('fetched functionaries')),
      );
  }
}
