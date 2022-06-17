import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Pokemon } from '../models/pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private http: HttpClient) {}

  private baseUrl = 'http://api.skilldistillery.com:8080/';
  private url = this.baseUrl + 'poke/data/poke';

  index(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(this.url + '?sorted=true').pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('PokemonService.index(): error retrieving pokemon: ' + err)
        );
      })
    );
  }

  create(pokemon: Pokemon): Observable<Pokemon> {
    // pokemon.types = null;
    console.log('PokemonService.create():');
    console.log(pokemon);

    const httpOptions = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    return this.http.post<Pokemon>(this.url, pokemon, httpOptions).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError(
          () => new Error('PokemonService.create(): Error creating pokemon: ' + err)
        );
      })
    );
  }

  update(pokemon: Pokemon): Observable<Pokemon> {
    // THIS FAILS WITH 500 INTERNAL SERVER ERROR
    console.log('PokemonService.update()');
    console.log(pokemon);
    // delete pokemon.types;
    // console.log(pokemon);
    // pokemon.types = [{id: 13}];
    // console.log(pokemon);
    const httpOptions = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    return this.http
      .put<Pokemon>(`${this.url}/${pokemon.pokeId}`, pokemon, httpOptions)
      .pipe(
        catchError((err: any) => {
          console.error(err);
          return throwError(
            () => new Error('PokemonService.update(): Error updating pokemon: ' + err)
          );
        })
      );
  }

  destroy(id: number) {
    return this.http.delete<Pokemon>(`${this.url}/${id}`)
    .pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('PokemonService.create(): Error deleting pokemon: ' + err)
        )
      })
    );
  }
}
