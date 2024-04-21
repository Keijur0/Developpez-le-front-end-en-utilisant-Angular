import { Component, Input, OnInit } from '@angular/core';
import { Medals } from '../../models/Medals';
import { OlympicService } from '../../services/olympic.service';
import { Observable } from 'rxjs';
import { Olympic } from '../../models/Olympic';

@Component({
  selector: 'app-medals-per-country',
  templateUrl: './medals-per-country.component.html',
  styleUrls: ['./medals-per-country.component.scss']
})
export class MedalsPerCountryComponent implements OnInit {
  @Input() data$!: Observable<Olympic[]>;
  public medalsPerCountry$!: Observable<Medals[]>;

  // Chart pie options
  scheme: string = "cool";
  labels: boolean = true;
  trimLabels: boolean = false;

  constructor( private olympicService: OlympicService ) {}

  ngOnInit(): void {
    // formatting data for chart pie
    this.olympicService.formatDataToMedalsPerCountry(this.data$);
    this.medalsPerCountry$ = this.olympicService.getMedalsPerCountry();
  }

  onActivate(data: Medals): void{
    console.log('Activated', JSON.parse(JSON.stringify(data)));
  }

}
