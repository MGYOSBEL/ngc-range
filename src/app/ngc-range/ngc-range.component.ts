import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { RangeState } from './range.state';

@Component({
  selector: 'app-ngc-range',
  templateUrl: './ngc-range.component.html',
  styleUrls: ['./ngc-range.component.scss']
})
export class NgcRangeComponent implements OnInit {

  range = new RangeState();
  canSetMax = false;
  canSetMin = false;

  showMinInput = false;
  showMaxInput = false;

  @Input()
  values: number[];

  @Input() min: number;
  @Input() max: number;

  @Output()
  valuesChange = new EventEmitter<number[]>();

  @ViewChild('inputRange') inputRange;

  constructor() {
  }

  ngOnInit(): void {
    if (this.values) {
      this.range = new RangeState(this.min, this.max, this.values[0], this.values[1]);
    }

  }

  setMin(event): void {
    if (this.canSetMin) {
      const element = this.inputRange.nativeElement;
      const variation = (event.clientX - element.offsetLeft) * 100 / element.clientWidth;
      this.range.lower = variation;
      this.notifyChangeValues();
    }
  }

  setMax(event): void {
    if (this.canSetMax) {
      const element = this.inputRange.nativeElement;
      const variation = (event.clientX - element.offsetLeft) * 100 / element.clientWidth;
      this.range.upper = variation;
      this.notifyChangeValues();
    }
  }

  setValue(event): void {
    this.canSetMax = false;
    this.canSetMin = false;
    const element = this.inputRange.nativeElement;
    const coordinate = (event.clientX - element.offsetLeft) * 100 / element.clientWidth;
    if (coordinate < this.range.lower) {
      this.range.lower = coordinate;
    }
    if (coordinate > this.range.upper) {
      this.range.upper = coordinate;
    }
    this.notifyChangeValues();
  }

  notifyChangeValues(): void {
    this.valuesChange.emit([
      this.range.lower,
      this.range.upper
    ]);
  }
  toggleMinInput(value: boolean): void {
    this.showMinInput = value;
  }
  toggleMaxInput(value: boolean): void {
    this.showMaxInput = value;
  }

  allowChangeMinValue(): void {
    this.canSetMin = true;
  }
  allowChangeMaxValue(): void {
    this.canSetMax = true;
  }
  disallowChangeMinValue(): void {
    this.canSetMin = false;
    console.log(this.range.lower, this.range.upper);
  }
  disallowChangeMaxValue(): void {
    this.canSetMax = false;
    console.log(this.range.lower, this.range.upper);
  }




}
