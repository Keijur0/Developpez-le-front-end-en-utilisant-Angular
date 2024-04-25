import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Olympic } from '../../models/Olympic';

interface MedalsPerOlympic {
  name: string;
  series: Series[];
}

interface Series {
  value: number;
  name: number;
}

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {
@Input() data$: Observable<Olympic[]> = new Observable<Olympic[]>;
@Input() scheme: string = '';
@Input() animations: boolean = false;
@Input() xAxis: boolean = false;
@Input() yAxis: boolean = false;
@Input() showGridLines: boolean = false;
@Input() showXAxisLabel: boolean = false;
@Input() showYAxisLabel: boolean = false;
@Input() xAxisLabel: string = '';
@Input() autoScale: boolean = false;
public lineChartData$: BehaviorSubject<MedalsPerOlympic[]> = new BehaviorSubject<MedalsPerOlympic[]>([]);

  constructor() { }

  ngOnInit(): void {
    this.lineChartData$ = this.getOlympicDataForLineChart(this.data$);
    console.log(this.lineChartData$);
  }

  // Formatting and retrieving Olympic data for line chart
  getOlympicDataForLineChart(inputData$: Observable<Olympic[]>): BehaviorSubject<MedalsPerOlympic[]> {
    const subject$: BehaviorSubject<MedalsPerOlympic[]> = new BehaviorSubject<MedalsPerOlympic[]>([]);
    inputData$.pipe(
      map(olympicData => {
        const countryMedalsPerOlympic: MedalsPerOlympic[] = olympicData.map(olympicItem => {
          const medalsPerYear: Series[] = [];
          olympicItem.participations.forEach(participation => {
            const series: Series = {
              value: participation.medalsCount,
              name: participation.year
            };
            medalsPerYear.push(series);
          })
          return {
            name: olympicItem.country,
            series: medalsPerYear
          }
        })
        subject$.next(countryMedalsPerOlympic);
      })
    ).subscribe();
    return subject$;
  }

}
