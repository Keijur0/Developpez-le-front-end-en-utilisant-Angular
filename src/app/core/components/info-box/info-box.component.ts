import { Component, Input, OnInit } from '@angular/core';
import { OlympicService } from '../../services/olympic.service';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Olympic } from '../../models/Olympic';

interface InfoBox {
  name: string;
  value: number;
}

@Component({
  selector: 'app-info-box',
  templateUrl: './info-box.component.html',
  styleUrls: ['./info-box.component.scss']
})
export class InfoBoxComponent implements OnInit {
  @Input() name!: string;
  public infoBoxContent$!: Observable<InfoBox>;
  private data$: Observable<Olympic[]> = this.olympicService.getOlympics();
  public numberOfJos$ = new BehaviorSubject<InfoBox>({name: "Infobox", value: 0});

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {

    // Choosing type of box
    if (this.name === "nbJos") {
      this.formatNumberOfJos(this.data$);
      this.infoBoxContent$ = this.getNumberOfJos();
    }
    if (this.name === "nbCountries") {
      this.infoBoxContent$ = this.getNumberofCountries(this.data$);
    }
  }

  // Gathering and formatting data for Info Boxes
  formatNumberOfJos(inputData$: Observable<Olympic[]>): void {
    let diffJos: number[] = [];
    inputData$.pipe(
      map(olympicItems => {
        olympicItems.forEach(olympicItem => {
          olympicItem.participations.forEach(item => {
            diffJos.some(year => year === item.year) ? null : diffJos.push(item.year);
          });
        });
        return diffJos.length;
      })
    ).subscribe(nbJos => {
      this.numberOfJos$.next({
        name: "Number of JOs",
        value: nbJos
      })
    });
  }

  getNumberOfJos(): BehaviorSubject<InfoBox> {
    return this.numberOfJos$;
  }

  // Getting the number of countries
  getNumberofCountries(inputData$: Observable<Olympic[]>): BehaviorSubject<InfoBox> {
    const nbCountries$ = inputData$.pipe(
      map(array => array.length)
    );
    const infoBox: InfoBox = {
      name: "Number of countries",
      value: 0
    };
    nbCountries$.subscribe(length => {
      infoBox.value = length;
    });
    return new BehaviorSubject(infoBox);
  }

}
