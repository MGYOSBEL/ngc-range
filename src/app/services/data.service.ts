import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient
    ) { }

  exercise1(): Observable<{min, max}> {
    return this.http.get<{min, max}>(`http://demo2826583.mockable.io/exercise1`);
  }
  exercise2(): Observable<number[]> {
    return this.http.get<number[]>(`http://demo2826583.mockable.io/exercise2`);
  }
}
