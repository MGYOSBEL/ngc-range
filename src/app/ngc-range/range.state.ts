export class RangeState {
  private minValue: number;
  private maxValue: number;
  private lowerRange: number;
  private upperRange: number;
  private range: number;
  private values: number[];


  constructor(min?: number, max?: number, lower?: number, upper?: number) {
    this.minValue = min || 0;
    this.maxValue = max || 100;
    this.lowerRange = !!lower ? lower : min;
    this.upperRange = !!upper ? upper : max;
    this.range = this.upperRange - this.lowerRange;
    this.initValues();
  }


  public get min(): number {
    return this.minValue;
  }

  public get max(): number {
    return this.maxValue;
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

  public get upper(): number {
    return this.upperRange;
  }
  public set upper(v: number) {
    if (this.validate(this.lowerRange, v)) {
      this.upperRange = Math.round(v);
      this.range = Math.round(v) - this.lowerRange;
    }
  }

  public get difference(): number {
    return this.range;
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
