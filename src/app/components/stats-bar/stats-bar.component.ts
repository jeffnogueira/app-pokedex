import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { StatsModel } from '../../models/pokemon.model';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'stats-bar-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats-bar.component.html',
  styleUrl: './stats-bar.component.scss'
})
export class StatsBarComponent implements OnInit, OnDestroy {

  @ViewChild('markerDiv', {static: true}) markerDivRef: ElementRef;

  @Input() nameStat: string = '';
  @Input() baseStat: number = 0;

  public colorMarkerNormal: string = 'rgb(49, 168, 216)';
  public colorMarkerShiny: string = 'rgb(255, 204, 51)';
  public percentStat: number = 0;
  public divMarkers: Array<number> = [90, 80, 70, 60, 50, 40, 30, 20, 10, 0];

  private _subscription = new Subscription();

  constructor (
    private _pokemonService: PokemonService
  ) { }

  ngOnInit(): void {
    this.formatName();
    this.calculatePercentStat();
    this.getShowShiny();
  }

  formatName(): void {
    this.nameStat = this.nameStat.replace('-', ' ');
  }

  calculatePercentStat(): void {
    this.percentStat = (this.baseStat * 100 / 255);
  }

  getShowShiny(): void {
    this._subscription.add(
      this._pokemonService.getShinyBehavior().subscribe(res => this.changeColorMarker() )
    );
  }

  getLinearGradient(percentMarker: number): string {
    if (this.percentStat > percentMarker)
      return `linear-gradient(0deg, ${this.colorMarkerNormal} ${this.getDifferencePercent(percentMarker)}%, transparent 0%)`;

    return 'transparent';
  }

  getDifferencePercent(percentMarker: number): number {
    const differencePercent = this.percentStat - percentMarker;

    return differencePercent > 0 && differencePercent < 10 ? differencePercent * 10 : 100;
  }

  changeColorMarker(): void {
    const childrens = this.markerDivRef.nativeElement.children;
    for (let child of childrens) {
      if (child.style.background.includes(this.colorMarkerNormal))
        this.setBackgroundColor(child, this.colorMarkerNormal, this.colorMarkerShiny);
      else
        this.setBackgroundColor(child, this.colorMarkerShiny, this.colorMarkerNormal);
    }
  }

  setBackgroundColor(child: any, applyColor: string, notApplyColor: string): void {
    child.setAttribute('style', `background: ${child.style.background.replace(applyColor, notApplyColor)}`);
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

}
