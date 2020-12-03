export class RangeState {
  private minValue: number;
  private maxValue: number;
  private lowerRange: number;
  private upperRange: number;
  private range: number;
  private values: number[];
  type: string;

  // Expect options to be ann object like:
  // const options = {
  //   min?: number;
  //   max?: number;
  //   lower? number;
  //   upper?: number;
  // values?: number[]
  // }
  constructor(type: string, options) {
    this.type = type;
    if (type === 'normal') {
      this.minValue = options.min;
      this.maxValue = options.max;
      this.lowerRange = !!options.lower ? options.lower : options.min;
      this.upperRange = !!options.upper ? options.upper : options.max;
      this.range = this.upperRange - this.lowerRange;
    } else if (type === 'fixed') {
      const values = [...options.values];
      this.values = values.sort((a, b) => a - b);
      this.minValue = this.values[0];
      this.maxValue = this.values[this.values.length - 1];
      this.lowerRange = this.minValue;
      this.upperRange = this.maxValue;
      this.range = this.upperRange - this.lowerRange;
    }
    // this.initValues();
  }


  public get min(): number {
    return this.minValue;
  }

  public get max(): number {
    return this.maxValue;
  }


  public get lowerPercent(): number {
    const val = (this.lowerRange - this.min) * 100 / (this.max - this.min);
    return Math.round(val);
  }
  public set lowerPercent(percent: number) {
    const value = this.min + (this.max - this.min) * percent / 100;
    if (this.validate(value, this.upperRange)) {
      if (this.type === 'normal') {
        this.lowerRange = Math.round(value);
      } else {
        const closer = this.findClosestValue(value);
        this.lowerRange = closer;
      }
      this.range = this.upperRange - this.lowerRange;
    }
  }

  public get lower(): number {
    return this.lowerRange;
  }
  public set lower(v: number) {
    if (this.validate(v, this.upperRange)) {
      this.lowerRange = Math.round(v);
      this.range = this.upperRange - Math.round(v);
    }
  }

  public get upperPercent(): number {
    const val = (this.upperRange - this.min) * 100 / (this.max - this.min);
    return Math.round(val);
  }
  public set upperPercent(percent: number) {
    const value = this.min + (this.max - this.min) * percent / 100;
    if (this.validate(this.lowerRange, value)) {
      if (this.type === 'normal') {
        this.upperRange = Math.round(value);
      } else {
        const closer = this.findClosestValue(value);
        this.upperRange = closer;
      }
      this.range = this.upperRange - this.lowerRange;
    }
  }

  public get upper(): number {
    return this.upperRange;
  }

  public set upper(v: number) {
    if (this.validate(this.lowerRange, v)) {
      this.upperRange = Math.round(v);
      this.range = Math.round(v) - this.lowerRange;
    }
  }

  public get differencePercent(): number {
    const val = (this.range) * 100 / (this.max - this.min);
    return Math.round(val);
  }

  public get difference(): number {
    return this.range;
  }

  private findClosestValue(value: number): number {
    let closer = this.values[0];
    this.values.forEach(elem => {
      if (Math.abs(elem - value) < Math.abs(value - closer)) {
        closer = elem;
      }
    });
    return closer;
  }

  private validate(lowerCandidate: number, upperCandidate: number): boolean {
    return ((lowerCandidate >= this.minValue) && (upperCandidate >= lowerCandidate) && (upperCandidate <= this.maxValue));
  }

  private initValues(): void {
    this.values = Array(this.maxValue - this.minValue + 1).fill(0).map((_, idx) => this.minValue + idx);
  }


  public set Values(v: number[]) {
    this.values = [...v];
  }

}
