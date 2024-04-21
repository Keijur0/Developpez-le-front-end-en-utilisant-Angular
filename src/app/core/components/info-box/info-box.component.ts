import { Component, Input, OnInit } from '@angular/core';
import { InfoBox } from '../../models/InfoBox';
import { OlympicService } from '../../services/olympic.service';
import { Observable, of } from 'rxjs';
import { Olympic } from '../../models/Olympic';

@Component({
  selector: 'app-info-box',
  templateUrl: './info-box.component.html',
  styleUrls: ['./info-box.component.scss']
})
export class InfoBoxComponent implements OnInit {
  @Input() name!: string;
  public infoBoxContent$: Observable<InfoBox> = of(new InfoBox);
  public olympics$: Observable<Olympic[]> = of([]);
  
  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    // Choosing type of box
    if (this.name === "nbJos") {
      this.olympicService.formatNumberOfJos(this.olympics$)
      this.infoBoxContent$ = this.olympicService.getNumberOfJos();
    }
    if (this.name === "nbCountries") {
      this.infoBoxContent$ = this.olympicService.getNumberofCountries(this.olympics$);
    }
  }

}
