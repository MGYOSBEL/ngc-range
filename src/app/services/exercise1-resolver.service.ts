import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MinLengthValidator } from '@angular/forms';
import { DataService } from './data.service';

@Injectable({ providedIn: 'root' })
export class Exercise1ResolverService implements Resolve<{min, max}> {
  constructor(private data: DataService) {

  }

  resolve(route: ActivatedRouteSnapshot): Observable<{min, max}> {
    console.log('resolver called');
    return this.data.exercise1();
  }
}
