import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Olympic } from '../../models/Olympic';
import { Router } from '@angular/router';

interface Medals {
  name: string;
  value: number;
}

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})

export class PieChartComponent implements OnInit {
  @Input() data$: Observable<Olympic[]> = new Observable<Olympic[]>;
  public medalsPerCountry$ = new BehaviorSubject<Medals[]>([]);

  // Chart pie options
  scheme: string = "cool";
  labels: boolean = true;
  trimLabels: boolean = false;

  constructor( private router: Router ) {}

  ngOnInit(): void {
    // formatting data for chart pie
    this.formatMedalsPerCountry(this.data$);
    this.medalsPerCountry$ = this.getMedalsPerCountry();
  }

    // Gathering medals per country and formatting data for chart pie
    formatMedalsPerCountry(inputData$: Observable<Olympic[]>): void {
      inputData$.pipe(
        map(olympicData => {
           const medalsPerCountry = olympicData.map(olympicItem => {
            const totalMedals = olympicItem.participations.reduce((acc, participation) => acc + participation.medalsCount, 0);
            return {
              name: olympicItem.country,
              value: totalMedals
            };
          });
          this.medalsPerCountry$.next(medalsPerCountry);
        })
      ).subscribe()
    };

    getMedalsPerCountry(): BehaviorSubject<Medals[]> {
      return this.medalsPerCountry$;
    }

  onSelect(data: Medals) {
    this.router.navigate(['/country-details'], { queryParams: {data: data.name} });
  }
}
