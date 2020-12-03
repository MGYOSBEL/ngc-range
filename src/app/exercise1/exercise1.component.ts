import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-exercise1',
  templateUrl: './exercise1.component.html',
  styleUrls: ['./exercise1.component.scss']
})
export class Exercise1Component implements OnInit, OnDestroy {

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute)
     {
    this.rangeValuesForm = this.formBuilder.group({
      minValue: this.rangeValues[0],
      maxValue: this.rangeValues[1]
    });
  }

  unsubscribe$ = new Subject<void>();

  rangeValues: number[] = [];
  limitValues: number[] = [];

  rangeValuesForm: FormGroup;

  ngOnInit(): void {

    this.route.data.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      (data: {values}) => {
        this.limitValues = [data.values.min, data.values.max];
        this.rangeValues = [data.values.min, data.values.max];
      }
    );

    this.rangeValuesForm.valueChanges.subscribe(
      formValue => this.rangeValues = [formValue.minValue, formValue.maxValue]
    );
  }

  onRangeChange(event): void {
    if (!!event) {
      this.rangeValuesForm.patchValue({
        minValue: event[0],
        maxValue: event[1]
        });
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
