import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, skip } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.scss']
})
export class CountryDetailsComponent implements OnInit {
  public countryName: string = '';
  private olympics$ = new Observable<Olympic[]>;
  public countryData$ = new Observable<Olympic[]>;

    // Line chart options
    scheme: string = "cool";
    animations: boolean = false;
    xAxis: boolean = true;
    yAxis: boolean = true;
    showGridLines: boolean = true;
    showXAxisLabel: boolean = true;
    showYAxisLabel: boolean = false;
    xAxisLabel: string = "Dates";
    xAxisTicks: number[] = [];
    autoScale: boolean = true;

      // Error / loading handling
    public errorMessage: string = '';
    public errorState: boolean = false;
    public noDataMessage: string = "No data to load.";
    public isLoading: boolean = false;
    public loadingMessage: string = "Loading...";
    public isCorrect: boolean = false;

  constructor( private route: ActivatedRoute, private router : Router, private olympicService: OlympicService ) {
    // Retrieving data from pie chart
    this.route.queryParams.subscribe(params => this.countryName = params['country']);

    // Retrieving original data
    this.olympics$ = olympicService.getOlympics();

    // Loading state
    this.olympicService.getLoadingState().subscribe(loadingState => {
      this.isLoading = loadingState;
    });

    // Error handling
    this.olympicService.getErrorState().subscribe((errorState) => {
      this.errorState = errorState;
      if (this.errorState) {
        this.olympicService.getErrorMessage().subscribe((errorMessage) => {
          this.errorMessage = errorMessage;
          this.isLoading = false;
        });
      }
    })    
   }

  ngOnInit(): void {    
    // If country name in url is incorrect or not matching with data, go to not-found page
    this.isCountryNameCorrect(this.olympics$, this.countryName).pipe(
      skip(1)
    ).subscribe(isNameCorrect => {
      this.isCorrect = isNameCorrect; 
      if(!this.isCorrect) {
        this.router.navigate(['**']);
      }
  })

    // Narrowing down data to the selected country
    this.countryData$ = this.getCountryData(this.olympics$, this.countryName);

    // Predefine line chart's X Axis values
    this.getXAxisTicks(this.countryData$).subscribe(ticks => {
      this.xAxisTicks = ticks;
    });
  }

  // Format specific country data
  getCountryData(inputData$: Observable<Olympic[]>, country: string): Observable<Olympic[]> {
    return inputData$.pipe(
      map(olympicItems => {
        return olympicItems.filter(olympicItem => country.toLowerCase() === olympicItem.country.toLowerCase()
        );
      })
    )
  }

    // Checking if country exists in data (e.g: if wrong country name spelling in url)
    isCountryNameCorrect(inputData$: Observable<Olympic[]>, country: string): Observable<boolean> {
      return inputData$.pipe(
        map(olympicItems => {
          return olympicItems.some(olympicItem => country.toLowerCase() === olympicItem.country.toLowerCase()
          );
        })
      );
    }

    // Defining data on line chart's X axis
    getXAxisTicks(inputData$: Observable<Olympic[]>): Observable<number[]> {
      return inputData$.pipe(
        map(olympicItems => {
          let xAxisTicks: number[] =[];
          olympicItems.forEach(olympicItem => {
            olympicItem.participations.forEach(participationItems => {
              xAxisTicks.some(year => participationItems.year === year) ? null : xAxisTicks.push(participationItems.year);
            });
          });
          return xAxisTicks;
        })
      )
    }
}


