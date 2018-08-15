import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {   MatListModule } from '@angular/material';
// import { RouterModule, Routes} from '@angular/router';
import { AppComponent } from './app.component';
import { FilterConditionsComponent } from './filter-conditions/filter-conditions.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { SelectMetricsComponent } from './select-metrics/select-metrics.component';
import { SelectedMetricsComponent } from './selected-metrics/selected-metrics.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { DndListModule } from 'ngx-drag-and-drop-lists';


// const appRoutes: Routes = [
//   {
//     path: 'menu',
//     component: FilterConditionsComponent
//   }

// ];

@NgModule({
  declarations: [
    AppComponent,
    FilterConditionsComponent,
    SideBarComponent,
    SelectMetricsComponent,
    SelectedMetricsComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule, MatCheckboxModule,
    BrowserAnimationsModule,
    MatListModule,
    MatTabsModule,
    FormsModule,
    DndListModule
    // RouterModule.forRoot(appRoutes)
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
