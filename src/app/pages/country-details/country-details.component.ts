import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.scss']
})
export class CountryDetailsComponent implements OnInit {
  public countryName: string = '';
  public olympics$ = new Observable<Olympic[]>;
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
    autoScale: boolean = true;

      // Error / loading handling
    public errorMessage: string = '';
    public errorState: boolean = false;
    public noDataMessage: string = "No data to load.";
    public isLoading: boolean = false;
    public loadingMessage: string = "Loading...";

  constructor( private route: ActivatedRoute, private olympicService: OlympicService ) { }

  ngOnInit(): void {
    // Loading state
    this.olympicService.getLoadingState().subscribe((loadingState) => {
      this.isLoading = loadingState;
    })

    // Retrieving data
    this.route.queryParams.subscribe(params => this.countryName = params['data']);
    this.olympics$ = this.olympicService.getOlympics();
    this.countryData$ = this.getCountryData(this.olympics$, this.countryName);

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

  // Format specific country data
  getCountryData(inputData$: Observable<Olympic[]>, country: string): Observable<Olympic[]> {
    return inputData$.pipe(
      map(olympicItems => {
        return olympicItems.filter(olympicItem => country.toLowerCase() === olympicItem.country.toLowerCase());
      })
    )
  }
}
