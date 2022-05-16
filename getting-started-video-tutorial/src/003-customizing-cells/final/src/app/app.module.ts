import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AgGridModule } from 'ag-grid-angular';
import { AppComponent } from './app.component';
import { MyCellComponent } from './my-cell/my-cell.component';
import { UnderComponent } from './under/under.component';
import { OverComponent } from './over/over.component';

@NgModule({
  declarations: [
    AppComponent,
    MyCellComponent,
    UnderComponent,
    OverComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AgGridModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
