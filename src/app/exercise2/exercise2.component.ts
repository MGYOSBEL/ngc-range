import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-exercise2',
  templateUrl: './exercise2.component.html',
  styleUrls: ['./exercise2.component.scss']
})
export class Exercise2Component implements OnInit, OnDestroy {


  constructor(
    private route: ActivatedRoute)
     {
  }

  unsubscribe$ = new Subject<void>();

  rangeValues: number[] = [];
  limitValues: number[] = [];


  ngOnInit(): void {

    this.route.data.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      (data) => {
        console.log(data.values);
        this.limitValues = [...data.values];
        this.rangeValues = [...data.values];
      }
    );

  }

  onRangeChange(event): void {
    console.log('Range Change');
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }


}
