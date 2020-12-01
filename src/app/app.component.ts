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
      minValue: [0],
      maxValue: [100]
    });
  }

  values: number[] = [0, 100];

  rangeValuesForm: FormGroup;

  ngOnInit(): void {

    this.rangeValuesForm.valueChanges.subscribe(
      formValue => this.values = [formValue.minValue, formValue.maxValue]
    );
  }
}
