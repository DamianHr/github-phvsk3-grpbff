import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Country } from './definitions';

/**
 * For more information refer to https://restcountries.eu/#api-endpoints-all
 */
const ApiUrl = 'https://restcountries.eu/rest/v2/name';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  constructor(private readonly http: HttpClient) {}

  public getByParameter(parameter: string): Observable<Readonly<Country[]>> {
    return this.http
      .get<Array<Country> | Country>(`${ApiUrl}/${parameter}`)
      .pipe(
        map((response) => (Array.isArray(response) ? response : [response])),
        map((array) => Object.freeze(array)),
        catchError(() => of([]))
      );
  }
}
