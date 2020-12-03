import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { DataService } from './data.service';
import { tap, mergeMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class Exercise2ResolverService implements Resolve<number[]> {
  constructor(private data: DataService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<number[]> {
    return this.data.exercise2();
  }
}
