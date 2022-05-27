import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AgGridModule } from 'ag-grid-angular';
import { AppComponent } from './app.component';
import { MyCustomComponent } from './my-custom/my-custom.component';
import { GoodbyeComponent, HelloComponent } from './cell-renderers/my-renderers';

@NgModule({
  declarations: [
    AppComponent,
    MyCustomComponent,
    HelloComponent,
    GoodbyeComponent
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
