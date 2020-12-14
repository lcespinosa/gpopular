import { Injectable } from '@angular/core';

import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import {Reply} from '../../models/reply';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ReplyService {

  url = '/management/replies';

  constructor(private http: HttpClient) { }

  getReplies(): Observable<Reply[]> {
    return this.http.get<Reply[]>(environment.apiUrl + this.url)
      .pipe(
        tap(reply => console.log('fetched respuesta')),
      );
  }

  getReply(id: number): Observable<Reply> {
    return this.http.get<Reply>(environment.apiUrl + this.url + `/${id}`)
      .pipe(
        tap(_ => console.log(`fetched reply id=${id}`)),
      );
  }

  addReply(reply: Reply): Observable<Reply> {
    return this.http.post<Reply>(environment.apiUrl + this.url, reply, httpOptions)
      .pipe(
        tap((rep: Reply) => console.log(`added reply w/ id=${rep.id}`))
      );
  }

  updateReply(id: number, reply: Reply): Observable<Reply> {
    return this.http.put<Reply>(environment.apiUrl + this.url + `/${id}`, reply, httpOptions)
      .pipe(
        tap(_ => console.log(`updated reply id=${id}`)),
      );
  }

  deleteReply(id: number): Observable<Reply> {
    return this.http.delete<Reply>(environment.apiUrl + this.url + `/${id}`, httpOptions)
      .pipe(
        tap(_ => console.log(`deleted reply ${id}`)),
      );
  }
}
