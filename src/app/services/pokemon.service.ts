import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PokemonModel } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  loadingBehavior: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  pokemonBehavior: BehaviorSubject<PokemonModel> = new BehaviorSubject<PokemonModel>(new PokemonModel());
  shinyBehavior: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private _httpClient: HttpClient
  ) { }

  getLoadingBehavior(): BehaviorSubject<boolean> {
		return this.loadingBehavior;
	}

  setLoadingBehavior(value: boolean): void {
		this.loadingBehavior.next(value);
	}

  getPokemonBehavior(): BehaviorSubject<PokemonModel> {
		return this.pokemonBehavior;
	}

  setPokemonBehavior(pokemon: PokemonModel): void {
		this.pokemonBehavior.next(pokemon);
	}

  getShinyBehavior(): BehaviorSubject<boolean> {
		return this.shinyBehavior;
	}

  setShinyBehavior(value: boolean): void {
		this.shinyBehavior.next(value);
	}

  getPokemon(pokemon: string): Observable<any> {
    return this._httpClient.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  }
}
