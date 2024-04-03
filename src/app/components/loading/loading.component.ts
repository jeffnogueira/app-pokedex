import { Component, OnDestroy, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { Subscription, take } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'loading-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss'
})
export class LoadingComponent implements OnInit, OnDestroy {

  public loading: boolean = false;
  
  private _subscription = new Subscription();

  constructor(
    private _pokemonService: PokemonService
  ) { }

  ngOnInit(): void {
    this.getLoading();
  }

  getLoading(): void {
    this._pokemonService.getLoadingBehavior().subscribe(res => this.loading = res)
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

}
