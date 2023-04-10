import { Injectable } from '@angular/core';
import { Http, Response, Headers} from '@angular/http';
import {Observable, Observer} from 'rxjs/Rx';
import {validateConfig} from "@angular/router/src/config";

@Injectable()
export class ImdbService {
  private baseUrl: string = 'http://localhost:9001';

  constructor(private http: Http) {
    console.log("ImdbService is initialized...")
  }

  getGenres(): Observable<any[]> {
    let genres$ = this.http
      .get(`${this.baseUrl}/genres`, {headers: this.getHeaders()})
      .map(response => response.json())
      .catch(handleError);
    return genres$;
  }

  findMovies(from: Number,to: Number,genre: String): Observable<any[]> {
    let movies$ = this.http
      .get(`${this.baseUrl}/movies?from=${from}&to=${to}&genre=${genre}`,
            {headers: this.getHeaders()})
      .map(response => response.json())
      .catch(handleError);
    return movies$;
  }

  private getHeaders(){
      let headers = new Headers();
      headers.append('Accept', 'application/json');
      return headers;
  }

};

function handleError (error: any) {
  // log error
  // could be something more sofisticated
  let errorMsg = error.message || `Yikes! There was was a problem with our hyperdrive device and we couldn't retrieve your data!`
  console.error(errorMsg);

  // throw an application level error
  return Observable.throw(errorMsg);
};
