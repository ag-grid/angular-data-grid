import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AgGridModule} from 'ag-grid-angular';
import {NumberFormatterComponent} from './number-formatter.component';
import {NumericEditorComponent} from './numeric-editor.component';
import {RangeFilterComponent} from './range-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    NumberFormatterComponent,
    NumericEditorComponent,
    RangeFilterComponent
  ],
  imports: [
    BrowserModule,
    AgGridModule.withComponents([NumberFormatterComponent, NumericEditorComponent, RangeFilterComponent])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
