import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.scss']
})
export class CountryDetailsComponent implements OnInit {
  public countryName: string = '';
  public olympics$: Observable<Olympic[]> = new Observable<Olympic[]>;

  constructor( private route: ActivatedRoute, private olympicService: OlympicService ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => this.countryName = params['data']);
    this.olympics$ = this.olympicService.getOlympics();
  }

}
