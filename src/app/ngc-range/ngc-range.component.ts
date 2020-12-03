import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { RangeState } from './range.state';

@Component({
  selector: 'app-ngc-range',
  templateUrl: './ngc-range.component.html',
  styleUrls: ['./ngc-range.component.scss']
})
export class NgcRangeComponent implements OnInit {

  range: RangeState;
  canSetMax = false;
  canSetMin = false;

  showMinInput = false;
  showMaxInput = false;

  @Input()
  values: number[];

  @Input() min: number;
  @Input() max: number;
  @Input() type: string = 'normal';

  @Output()
  valuesChange = new EventEmitter<number[]>();

  @ViewChild('inputRange') inputRange;

  constructor() {
  }

  ngOnInit(): void {
    console.log(`initializing ngc-range with type: ${this.type} and values ${this.values}`);
    const options = {
      min: this.min,
      max: this.max,
      lower: this.values[0],
      upper: this.values[1],
      values: [...this.values]
    };
    this.range = new RangeState(this.type, options);
    console.log(this.range, this.values);
  }

  setMin(event): void {
    if (this.canSetMin) {
      const element = this.inputRange.nativeElement;
      const variation = (event.clientX - element.offsetLeft) * 100 / element.clientWidth;
      this.range.lowerPercent = variation;
      this.notifyChangeValues();
    }
  }

  setMax(event): void {
    if (this.canSetMax) {
      const element = this.inputRange.nativeElement;
      const variation = (event.clientX - element.offsetLeft) * 100 / element.clientWidth;
      this.range.upperPercent = variation;
      this.notifyChangeValues();
    }
  }

  setValue(event): void {
    this.canSetMax = false;
    this.canSetMin = false;
    const element = this.inputRange.nativeElement;
    const coordinate = (event.clientX - element.offsetLeft) * 100 / element.clientWidth;
    const upperDistance = Math.abs(coordinate - this.range.upperPercent);
    const lowerDistance = Math.abs(coordinate - this.range.lowerPercent);
    upperDistance < lowerDistance ? this.range.upperPercent = coordinate : this.range.lowerPercent = coordinate;
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
  }
  disallowChangeMaxValue(): void {
    this.canSetMax = false;
  }




}
