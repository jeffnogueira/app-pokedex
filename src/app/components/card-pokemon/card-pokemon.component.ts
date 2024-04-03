import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PokemonModel } from '../../models/pokemon.model';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../services/pokemon.service';
import { StatsBarComponent } from '../stats-bar/stats-bar.component';
import { Subscription, take } from 'rxjs';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'card-pokemon-component',
  standalone: true,
  imports: [CommonModule, StatsBarComponent, ButtonComponent],
  templateUrl: './card-pokemon.component.html',
  styleUrl: './card-pokemon.component.scss'
})
export class CardPokemonComponent implements OnInit, OnDestroy {

  @Input() pokemon: PokemonModel = new PokemonModel();

  showShiny: boolean = false;
  statsPokemon: Array<any> = [];

  private _subscription = new Subscription();

  constructor(
    private _pokemonService: PokemonService
  ) { }

  ngOnInit() {
    this.getPokemon();
    this.getShinyView();
  }

  getPokemon(): void {
    this._subscription.add(
      this._pokemonService.getPokemonBehavior().subscribe(res => {
        this.pokemon = res;
        this.showShiny = false;
        this.statsPokemon = this.pokemon.stats
      })
    );
  }

  getShinyView(): void {
    this._subscription.add(
      this._pokemonService.getShinyBehavior().subscribe(res => this.showShiny = res)
    );
  }

  viewShiny(): void {
    this._pokemonService.setShinyBehavior(!this.showShiny);
  }

  makeHimCry(): void {
    if (this.pokemon.cries) {
      const audio = new Audio(this.pokemon.cries.latest);
      audio.load();
      audio.play();
    }
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

}
