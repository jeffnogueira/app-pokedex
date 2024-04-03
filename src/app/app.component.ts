import { Component, OnDestroy, OnInit } from '@angular/core';
import { PokemonService } from './services/pokemon.service';
import { Subscription, take } from 'rxjs';
import { PokemonModel } from './models/pokemon.model';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CardPokemonComponent } from './components/card-pokemon/card-pokemon.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ButtonComponent } from './components/button/button.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HttpClientModule, CardPokemonComponent, LoadingComponent, ButtonComponent],
  providers: [PokemonService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {

  public pokemon: PokemonModel;

  private _lastPokemon: number = 1025;
  private _subscription = new Subscription();

  constructor (
    private _pokemonService: PokemonService
  ) {
    this._subscription.add(
      this._pokemonService.getPokemonBehavior().subscribe(res => this.pokemon = res )
    )
  }

  ngOnInit(): void {
    this.getPokemon();
  }

  getPokemon(): void {
    this._pokemonService.setLoadingBehavior(true);
    const numberPokedex = this.generateRandomNumber();

    this._pokemonService.getPokemon(numberPokedex).pipe(take(1)).subscribe((res: PokemonModel) => {
      this._pokemonService.setLoadingBehavior(false);
      this._pokemonService.setPokemonBehavior(res);
    })
  }

  generateRandomNumber(): string {
    return (Math.floor(Math.random() * this._lastPokemon) + 1).toString();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
