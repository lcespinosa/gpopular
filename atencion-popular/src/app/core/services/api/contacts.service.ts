import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {tap} from 'rxjs/operators';
import {Contact} from '../../models/contact';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  url = '/localization/contacts';

  constructor(private http: HttpClient) { }

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(environment.apiUrl + this.url)
      .pipe(
        tap(contact => console.log('fetched contactos')),
      );
  }

  getContact(id: number): Observable<Contact> {
    return this.http.get<Contact>(environment.apiUrl + this.url + `/${id}`)
      .pipe(
        tap(_ => console.log(`fetched contacto id=${id}`)),
      );
  }

  addContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(environment.apiUrl + this.url, contact, httpOptions)
      .pipe(
        tap((func: Contact) => console.log(`added contacto w/ id=${func.id}`))
      );
  }

  updateContact(id: number, contact: Contact): Observable<Contact> {
    return this.http.put<Contact>(environment.apiUrl + this.url + `/${id}`, contact, httpOptions)
      .pipe(
        tap(_ => console.log(`updated contacto id=${id}`)),
      );
  }

  deleteContact(id: number): Observable<Contact> {
    return this.http.delete<Contact>(environment.apiUrl + this.url + `/${id}`, httpOptions)
      .pipe(
        tap(_ => console.log(`deleted contacto ${id}`)),
      );
  }
}
