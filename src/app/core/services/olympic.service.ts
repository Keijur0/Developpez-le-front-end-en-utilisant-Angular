import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Olympic[]>([]);
  public errorState$ = new BehaviorSubject<boolean>(false);
  public errorMessage$ = new BehaviorSubject<string>('');
  public loadingState$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  loadInitialData(): Observable<Olympic[]> {
    this.loadingState$.next(true);
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((value) => {
        this.olympics$.next(value);
        this.errorState$.next(false);
        this.errorMessage$.next('');
        this.loadingState$.next(false);
  }),
      catchError((error) => {
        this.errorState$.next(true);
        this.errorMessage$.next('Could not load data...');
        this.olympics$.next([]);
        this.loadingState$.next(false);
        return throwError(() => error);
      })
    );
  }

  getOlympics(): Observable<Olympic[]> {
    return this.olympics$.asObservable();
  }

  getErrorState(): Observable<boolean> {
    return this.errorState$.asObservable();
  }

  getErrorMessage(): Observable<string> {
    return this.errorMessage$.asObservable();
  }

  getLoadingState(): Observable<boolean> {
    return this.loadingState$.asObservable();
  }
}