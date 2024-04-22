import { Component, Input, OnInit } from '@angular/core';
import { Medals } from '../../models/Medals';
import { OlympicService } from '../../services/olympic.service';
import { Observable } from 'rxjs';
import { Olympic } from '../../models/Olympic';
import { Router } from '@angular/router';

@Component({
  selector: 'app-medals-per-country',
  templateUrl: './medals-per-country.component.html',
  styleUrls: ['./medals-per-country.component.scss'],
})
export class MedalsPerCountryComponent implements OnInit {
  @Input() data$!: Observable<Olympic[]>;
  public medalsPerCountry$!: Observable<Medals[]>;

  // Chart pie options
  scheme: string = "cool";
  labels: boolean = true;
  trimLabels: boolean = false;

  constructor( private olympicService: OlympicService, private router: Router ) {}

  ngOnInit(): void {
    // formatting data for chart pie
    this.olympicService.formatDataToMedalsPerCountry(this.data$);
    this.medalsPerCountry$ = this.olympicService.getMedalsPerCountry();
  }

  onSelect(data: Medals): void {
    console.log('clicked', JSON.parse(JSON.stringify(data)))
    this.router.navigateByUrl('country-details');
  }
}
