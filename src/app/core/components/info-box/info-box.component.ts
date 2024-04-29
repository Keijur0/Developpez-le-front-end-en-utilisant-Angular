import { Component, Input, OnInit } from '@angular/core';
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
  @Input() name: string = '';
  @Input() data$: Observable<Olympic[]> = new Observable<Olympic[]>;
  public infoBoxContent$: BehaviorSubject<InfoBox> = new BehaviorSubject<InfoBox>({name: "", value: 0});

  constructor() {}

  ngOnInit(): void {
    // Choosing type of box
    switch(this.name){
      case "nbJos": {
        this.infoBoxContent$ = this.getNumberOfJos(this.data$);
        break;
      }
      case "nbCountries": {
        this.infoBoxContent$ = this.getNumberofCountries(this.data$);
        break;
      }
      case "nbEntries": {
        this.infoBoxContent$ = this.getNumberOfEntries(this.data$);
        break;
      }
      case "nbAthletes": {
        this.infoBoxContent$ = this.getNumberOfAthletes(this.data$);
        break;
      }
      case "nbMedals": {
        this.infoBoxContent$ = this.getNumberOfMedals(this.data$);
        break;
      }
      default: { 
        break;
      };
    }
  }

  // Getting nbJos InfoBox in total data
  getNumberOfJos(inputData$: Observable<Olympic[]>): BehaviorSubject<InfoBox> {
    const subject$: BehaviorSubject<InfoBox> = new BehaviorSubject<InfoBox>({name: "Number of JOs", value: 0});
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
      subject$.next({
        name: "Number of JOs",
        value: nbJos
      });
    });
    return subject$;
  }

  // Getting nbCountries InfoBox in total data
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

  // Getting nbEntries InfoBox in single country data
  getNumberOfEntries(inputData$: Observable<Olympic[]>): BehaviorSubject<InfoBox> {
    const nbEntries$ = inputData$.pipe(
      map(countryData => {
        return countryData.reduce((totalEntries, countryItems) => {
          return totalEntries + countryItems.participations.length;
        }, 0);
      })
    )
    const infoBox: InfoBox = {
      name: "Number of entries",
      value: 0
    }
    nbEntries$.subscribe(obsNumber => infoBox.value = obsNumber);
    return new BehaviorSubject(infoBox);
  }

  // Getting nbAthletes InfoBox in single country data
  getNumberOfAthletes(inputData$: Observable<Olympic[]>): BehaviorSubject<InfoBox> {
    const subject$ = new BehaviorSubject<InfoBox>({name: "Number of athletes", value: 0});
    inputData$.pipe(
      map(countryData => { 
        const nbAthletes = countryData.reduce((totalAthletes, participationData) => {
          return totalAthletes + participationData.participations.reduce((totalAthletesInCountry, participation) => totalAthletesInCountry + participation.athleteCount, 0);
         }, 0);
        const infoBox: InfoBox = {
          name: "Number of athletes",
          value: nbAthletes
        };
        subject$.next(infoBox);
      })
    ).subscribe()
    return subject$;
  }

  // Getting nbMedals InfoBox single country data
  getNumberOfMedals(inputData$: Observable<Olympic[]>): BehaviorSubject<InfoBox> {
    const subject$ = new BehaviorSubject<InfoBox>({name: "Total number medals", value: 0});
    inputData$.pipe(
      map(countryData => {
        const nbMedals = countryData.reduce((totalMedals, participationData) => {
          return totalMedals + participationData.participations.reduce((totalMedalsPerCountry, participation) => totalMedalsPerCountry + participation.medalsCount, 0);
        }, 0);
        const infoBox: InfoBox = {
          name: "Total number medals",
          value: nbMedals
        };
        subject$.next(infoBox);
      })
    ).subscribe()
    return subject$;
  }

}
