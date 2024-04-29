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
  @Input() scheme: string = '';
  @Input() labels: boolean = false;
  @Input() trimLabels: boolean = false;
  public pieChartData$ = new BehaviorSubject<Medals[]>([]);

  constructor( private router: Router ) {}

  ngOnInit(): void {
    this.pieChartData$ = this.getMedalsPerCountry(this.data$);
  }

    // Gathering medals per country and formatting data for chart pie
    getMedalsPerCountry(inputData$: Observable<Olympic[]>): BehaviorSubject<Medals[]> {
      const subject$: BehaviorSubject<Medals[]> = new BehaviorSubject<Medals[]>([]);
      inputData$.pipe(
        map(olympicData => {
           const medalsPerCountry = olympicData.map(olympicItem => {
            const totalMedals = olympicItem.participations.reduce((acc, participation) => acc + participation.medalsCount, 0);
            return {
              name: olympicItem.country,
              value: totalMedals
            };
          });
          subject$.next(medalsPerCountry);
        })
      ).subscribe()
      return subject$;
    };

  onSelect(data: Medals) {
    this.router.navigate(['country-details'], { queryParams: {data: data.name} });
  }
}
