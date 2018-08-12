import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {   MatListModule } from '@angular/material';
import { RouterModule, Routes} from '@angular/router';
import { AppComponent } from './app.component';
import { FilterConditionsComponent } from './filter-conditions/filter-conditions.component';
import { SideBarComponent } from './side-bar/side-bar.component';


const appRoutes: Routes = [
  {
    path: 'menu',
    component: FilterConditionsComponent
  }

];

@NgModule({
  declarations: [
    AppComponent,
    FilterConditionsComponent,
    SideBarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatListModule,
    RouterModule.forRoot(appRoutes)
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
