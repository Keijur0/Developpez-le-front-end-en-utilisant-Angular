import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic } from 'src/app/core/models/Olympic';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<Olympic[]> = new Observable<Olympic[]>;

  // Pie chart options
  scheme: string = "cool";
  labels: boolean = true;
  trimLabels: boolean = false;

  // Error handling
  public error = this.olympicService.errorState;
  public errorMessage = this.olympicService.errorMessage;
  
  
  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
  }


}
