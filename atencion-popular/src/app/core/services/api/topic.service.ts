import { Injectable } from '@angular/core';

import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Topic } from '../../models/topic';
import {environment} from '../../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  url = '/nomenclature/topics';

  constructor(private http: HttpClient) { }

  getTopics(): Observable<Topic[]> {
    return this.http.get<Topic[]>(environment.apiUrl + this.url)
      .pipe(
        tap(cpopular => console.log('fetched asuntos')),
      );
  }

  getTopic(id: number): Observable<Topic> {
    return this.http.get<Topic>(environment.apiUrl + this.url + `/${id}`)
      .pipe(
        tap(_ => console.log(`fetched asunto id=${id}`)),
      );
  }

  addTopic(cpopular: Topic): Observable<Topic> {
    return this.http.post<Topic>(environment.apiUrl + this.url, cpopular, httpOptions)
      .pipe(
        tap((cpop: Topic) => console.log(`added asunto w/ id=${cpop.id}`))
      );
  }

  updateTopic(id: number, cpopular: Topic): Observable<Topic> {
    return this.http.put<Topic>(environment.apiUrl + this.url + `/${id}`, cpopular, httpOptions)
      .pipe(
        tap(_ => console.log(`updated asunto id=${id}`)),
      );
  }

  deleteTopic(id: number): Observable<Topic> {
    return this.http.delete<Topic>(environment.apiUrl + this.url + `/${id}`, httpOptions)
      .pipe(
        tap(_ => console.log(`deleted asunto ${id}`)),
      );
  }
}
