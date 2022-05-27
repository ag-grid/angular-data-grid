# Getting Started

This section will help you get started with the enterprise edition of AG Grid. The community edition is free to use in commercial applications, the Enterprise edition requires a license and offers extra features like pivoting, aggregation, integrated charts, row grouping, server side data models and more.

## Quick Start Guide Video

https://youtu.be/xe6i3W6qW5k

- 00:00 Starting Code
- 00:45 Add Enterprise Package
- 01:45 Enabling Enterprise
- 02:15 Row Grouping
- 03:17 Enterprise Features
- 03:37 Watermarks and License

## Starting Code

The starting point for this code is a very simple `AppComponent`, using the community edition, which sets up a data grid with 10 columns and pulls in data from the server using the Grid Ready event.

```typescript
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public columnDefs: ColDef[] = [
    { field: 'athlete'},
    { field: 'age'},
    { field: 'country' },
    { field: 'year' },
    { field: 'date'},
    { field: 'sport'},
    { field: 'gold'},
    { field: 'silver'},
    { field: 'bronze'},
    { field: 'total'},
  ];
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    enableRowGroup: true
  };
  
  public rowData$!: Observable<any[]>;

  constructor(private http: HttpClient) {}

  onGridReady(params: GridReadyEvent) {
    this.rowData$ = this.http
      .get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json');
  }
}
```

The HTML for the component in `app.component.html` wires all this together:

```html
<ag-grid-angular
    style="width: 100%; height: 100%"
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [rowData]="rowData$ | async"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular>
```

## Add Enterprise Package

To use the Enterprise features we need to install the Enterprise package.

Do this from the terminal in the project root folder using `npm`.

```shell
npm i --save ag-grid-enterprise
```

This will mean that our project has three AG Grid packages:

- `ag-grid-angular` the wrapper that allows AG Grid to work with Angular
- `ag-grid-community` the core features of AG Grid
- `ag-grid-enterprise` the additional enterprise features of AG Grid

All three are required to use AG Grid Enterprise with Angular and they should all be the same version.

## Enabling Enterprise

Having installed and added AG Grid Enterprise into our project we enable it by importing `ag-grid-enterprise` into our `app.module.ts`:

```javascript
import 'ag-grid-enterprise'
```

So that our `app.module.ts` looks like the code below:

```javascript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AgGridModule } from 'ag-grid-angular';
import { AppComponent } from './app.component';

import 'ag-grid-enterprise'

@NgModule({
  declarations: [
    AppComponent
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
```

At this point, AG Grid will now be using the Enterprise edition and out of the box you will see new options like the right click menu now being an AG Grid menu with export and clipboard options, and you will see richer filtering capabilities. There are many more features available which can be found in the documentation. In this section we will only cover a small subset of available Enterprise features.

## Row Grouping

Row Grouping allows us to group by fields in a row. These can be expanded to create a tree view of the data.

To add Row Grouping, choose the field to group and add the `rowGroup` property:

```javascript
    { field: 'country', rowGroup: true },
```

Multiple fields can be grouped:

```javascript
    { field: 'country', rowGroup: true },
    { field: 'year', rowGroup: true },
```

It is also possible to enable row grouping for the user to have control over the grouping.

```javascript
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    enableRowGroup: true
  };
```

In order to allow the user to group we have to display the grouping drop zone at the top of the grid where the user can drag the columns to group by.

This is done by adding the `rowGroupPanelShow` property in the grid options.

```html
 [rowGroupPanelShow]="'always'"
```

So that our grid configuration in `app.component.html` looks like the code below.

```html
<ag-grid-angular
    style="width: 100%; height: 100%"
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [rowData]="rowData$ | async"
    [rowGroupPanelShow]="'always'"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular>
```

Learn more about Row Grouping in the documentation:

https://www.ag-grid.com/angular-data-grid/grouping/

You will see that enterprise features like row grouping are identifiable with a red "(e)" symbol in the docs. Anything without this symbol means it is part of the Community edition.

AG Grid does not require a trial license for Enterprise evaluation you are free to trial Enterprise in your own organization, a license is required when you deploy the application to production.

If you wish to remove the watermark and console message then a trial license can be issued to help you evaluate AG Grid without the license warnings.

Contact `info@ag-grid.com` if you wish to purchase a license, or be issued with a trial license.