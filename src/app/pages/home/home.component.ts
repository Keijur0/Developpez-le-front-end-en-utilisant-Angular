import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic } from 'src/app/core/models/Olympic';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();
  public olympics$: Observable<Olympic[]> = new Observable<Olympic[]>;

  // Pie chart options
  scheme: string = "cool";
  labels: boolean = true;
  trimLabels: boolean = false;

  // Error / loading handling
  public errorMessage: string = '';
  public errorState: boolean = false;
  public noDataMessage: string = "No data to load.";
  public isLoading: boolean = false;
  public loadingMessage: string = "Loading...";
  
  
  constructor(private olympicService: OlympicService) { 
    this.olympics$ = olympicService.getOlympics();
    // Loading state
    this.olympicService.getLoadingState().pipe(takeUntil(this.ngUnsubscribe)).subscribe((loadingState) => {
      this.isLoading = loadingState;
    })

    // Error handling
    this.olympicService.getErrorState().pipe(takeUntil(this.ngUnsubscribe)).subscribe((errorState) => {
      this.errorState = errorState;
      if (this.errorState) {
        this.olympicService.getErrorMessage().pipe(takeUntil(this.ngUnsubscribe)).subscribe((errorMessage) => {
          this.errorMessage = errorMessage;
          this.isLoading = false;
        });
      }
    })    
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
