import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filter, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  searchForm: FormGroup;
  private unsubscribe$ = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.searchFormInit();
  }

  searchFormInit() {
    this.searchForm = this.formBuilder.group({
      searchInput: ['', [Validators.required, Validators.minLength(2)]]
    }
    );
    this.setSearchConfig();
  }

  setSearchConfig() {
    this.searchForm.valueChanges.pipe(
      filter(value => value.searchInput.length > 2),
      debounceTime(1000),
      distinctUntilChanged(),
      takeUntil(this.unsubscribe$)
    ).subscribe(
      () => this.onSearch()
    );

  }

  onSearch() {
    const term = this.searchForm.value.searchInput;
    this.router.navigate(['users'], {queryParams: {q: term} });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
