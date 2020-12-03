import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Exercise1Component } from './exercise1/exercise1.component';
import { Exercise1ResolverService } from './services/exercise1-resolver.service';
import { HomeComponent } from './home/home.component';
import { Exercise2Component } from './exercise2/exercise2.component';
import { Exercise2ResolverService } from './services/exercise2-resolver.service';

const routes: Routes = [
  {
    path: 'exercise1',
    component: Exercise1Component,
    resolve: {values: Exercise1ResolverService}
  },
  {
    path: 'exercise2',
    component: Exercise2Component,
    resolve: {values: Exercise2ResolverService}
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  { path: '', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
