import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ngc-range';

  constructor(private formBuilder: FormBuilder) {
    this.rangeValuesForm = this.formBuilder.group({
      minValue: this.rangeValues[0],
      maxValue: this.rangeValues[1]
    });
  }

  rangeValues: number[] = [0, 100];

  rangeValuesForm: FormGroup;

  ngOnInit(): void {

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
}
