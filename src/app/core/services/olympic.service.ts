import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';
import { Medals } from '../models/Medals';
import { InfoBox } from '../models/InfoBox';


@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Olympic[]>([]);
  private medalsPerCountry$: BehaviorSubject<Medals[]> = new BehaviorSubject<Medals[]>([]);
  private numberOfJos$: BehaviorSubject<InfoBox> = new BehaviorSubject<InfoBox>(new InfoBox);

  constructor(private http: HttpClient) {}

  loadInitialData() {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        // TODO: improve error handling
        console.error(error);
        // can be useful to end loading state and let the user know something went wrong
        this.olympics$.next([]); 
        return caught;
      })
    );
  }

  getOlympics() {
    return this.olympics$.asObservable();
  }

  // Gathering medals per country and formatting data for chart pie
  formatDataToMedalsPerCountry(inputData$: Observable<Olympic[]>): void {
    inputData$.pipe(
      map(inputData => {
        const medalsPerCountry = inputData.map(item => {
          const totalMedals = item.participations.reduce((acc, participation) => acc + participation.medalsCount, 0);
          return {
            name: item.country,
            value: totalMedals
          };
        });
        this.medalsPerCountry$.next(medalsPerCountry);
      })
    ).subscribe();
  };

  // Getting the transformed data (Medals per Country)
  getMedalsPerCountry() {
    return this.medalsPerCountry$.asObservable();
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

  // Getting the transformed data (Number of JOs)
  getNumberOfJos() {
    return this.numberOfJos$.asObservable();
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