import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Olympic } from '../../models/Olympic';
import { Participation } from '../../models/Participation';

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
  @Input() countryName: string = '';
  private countryData$: Observable<Olympic[]> = new Observable<Olympic[]>;
  public infoBoxContent$: Observable<InfoBox> = new Observable<InfoBox>;
  public numberOfJos$ = new BehaviorSubject<InfoBox>({name: "Number of JOs", value: 0});
  public numberOfAlthetes$ = new BehaviorSubject<InfoBox>({name: "Total number of athletes", value: 0});

  constructor() {}

  ngOnInit(): void {
    
    if(this.countryName){
      this.countryData$ = this.getCountryData(this.data$, this.countryName);
    }
    // Choosing type of box
    switch(this.name){
      case "nbJos": {
        this.formatNumberOfJos(this.data$);
        this.infoBoxContent$ = this.getNumberOfJos();
        break;
      }
      case "nbCountries": {
        this.infoBoxContent$ = this.getNumberofCountries(this.data$);
        break;
      }
      case "nbEntries": {
        this.infoBoxContent$ = this.getNumberOfEntries(this.countryData$);
        break;
      }
      case "nbAthletes": {
        this.infoBoxContent$ = this.getNumberOfAthletes(this.countryData$);
        break;
      }
      case "nbMedals": {
        this.infoBoxContent$ = this.getNumberOfMedals(this.countryData$);
        break;
      }
      default: { 
        break;
      };
  }
  }

  // Format specific country data
  getCountryData(inputData$: Observable<Olympic[]>, country: string): Observable<Olympic[]> {
    return inputData$.pipe(
      map(olympicItems => {
        return olympicItems.filter(olympicItem => country.toLowerCase() === olympicItem.country.toLowerCase());
      })
    )
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

  // Retrieving formatted Number of JOs
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

  // Getting nbEntries InfoBox
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

  // Getting nbAthletes InfoBox
  getNumberOfAthletes(inputData$: Observable<Olympic[]>): BehaviorSubject<InfoBox> {
    const subject = new BehaviorSubject<InfoBox>({name: "Number of athletes", value: 0});
    inputData$.pipe(
      map(countryData => { 
        const nbAthletes = countryData[0].participations.reduce((totalAthletes, participation) => {
          return totalAthletes + participation.athleteCount
        }, 0);
        const infoBox: InfoBox = {
          name: "Number of athletes",
          value: nbAthletes
        };
        subject.next(infoBox);
      })
    ).subscribe()
    return subject;
  }

  // Getting nbMedals InfoBox
  getNumberOfMedals(inputData$: Observable<Olympic[]>): BehaviorSubject<InfoBox> {
    const subject = new BehaviorSubject<InfoBox>({name: "Total number medals", value: 0});
    inputData$.pipe(
      map(countryData => {
        const nbMedals = countryData[0].participations.reduce((totalMedals, participation) => {
          return totalMedals + participation.medalsCount
        }, 0);
        const infoBox: InfoBox = {
          name: "Total number medals",
          value: nbMedals
        };
        subject.next(infoBox);
      })
    ).subscribe()
    return subject;
  }

}
