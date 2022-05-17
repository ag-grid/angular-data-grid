# Getting Started

This section will help you get started with the community edition of AG Grid using Angular so you learn how to setup the project, render your first grid, load data from a server and configure some simple properties.

## Quick Start Guide Video

https://youtu.be/_cRDVM6NlPk

- 00:00 Create Angular App
- 01:13 Using AG Grid
- 03:45 Loading Data via HTTP
- 04:40 Sorting and Filtering
- 05:20 Grid Options
- 05:50 Grid Events
- 06:30 Grid API
- 07:20 Summary

## Starting Code

This section will take you from a no file starting point.

If you download the code from Github then the source in `src/001-quickstart-guide` starts you off immediately after installing the code and removing the boiler plate, in section `Using AG Grid` below.

- https://github.com/ag-grid/angular-data-grid/tree/main/getting-started-video-tutorial

## Create Angular App

The first step in any Angular tutorial is creating the Angular app.

Install The Angular CLI from [cli.angular.io](https://cli.angular.io/)

At the terminal run the command:

```shell
ng new my-app  --style scss --routing false
```

Then change directory into the app directory:

```shell
cd my-app/
```

Install the AG Grid packages:

```shell
npm i ag-grid-community
npm i ag-grid-angular
```

At this point you will be able to start the application:

```shell
npm run start
```

At this point the application will be the Angular app template and we can start adding specific AG Grid code.

The dependencies in `package.json` will now include Angular and the `ag-grid-angular` and `ag-grid-community` packages.

- `ag-grid-community` contains all the core logic for AG Grid
- `ag-grid-angular` contains the AG Grid GUI rendering code for Angular

Over time, as you upgrade versions of AG Grid it is important to make sure that the versions of both packages are the same.

## Using AG Grid

The first code file to change is `app.module.ts` we need to add the AG Grid module to the module declarations.

Add the `AgGridModule`:

```javascript
import { AgGridModule } from 'ag-grid-angular';
```

And add AG Grid to the imports to gain access to the AG Grid component in the entire application.

```javascript
  imports: [
    BrowserModule,
    AgGridModule
  ],
```

Also remove the boiler plate code in `app.components.ts`

```javascript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

}
```

And add some basic properties to the `app.component.ts` in the `AppComponent` class:

```typescript
export class AppComponent {
    rowData: any[] = [];
    colDefs: ColDef[] = [];
}
```

Remember to import the `ColDef`:

```typescript
import { ColDef } from 'ag-grid-community';
```

To render an AG Grid Data Grid we need to amend the `app.component.html` to show an AG Grid Data Grid with the `AppComponent` properties:

```html
<ag-grid-angular
    [rowData]="rowData"
    [columnDefs]="colDefs"
  ></ag-grid-angular>
```


The `colDef` in `AppComponent` defines the columns that we want to display in the grid, we will add 3 columns: `make`, `model` and `price`.

```typescript
 colDefs: ColDef[] = [
    { field: 'make'},
    { field: 'model'},
    { field: 'price' }
 ];
```

Then the `rowData` in `AppComponent` contains the data we want to render as rows in the data grid:

```typescript
    rowData = [
        { make: 'Toyota', model: 'Celica', price: 35000 },
        { make: 'Ford', model: 'Mondeo', price: 32000 },
        { make: 'Porsche', model: 'Boxster', price: 72000 }
    ];
```

This won't render until we add styling, and width and height properties.

To add the AG Grid css we amend the `styles.scss` file:

```scss
@import 'ag-grid-community/dist/styles/ag-grid.css';
@import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
```

- `ag-grid.css` is the structural css that creates the data grid
- `ag-theme-alpine.css` is the theme which defines the colours and aesthetics

Then we use the style on our data grid.

```html
<ag-grid-angular
    class="ag-theme-alpine"
    [rowData]="rowData"
    [columnDefs]="colDefs"
  ></ag-grid-angular>
```

There is one more step before we actually see a data grid on screen, and that is to set a width and height.

```html
<ag-grid-angular
    style="width: 500px; height: 500px"
    class="ag-theme-alpine"
    [rowData]="rowData"
    [columnDefs]="colDefs"
  ></ag-grid-angular>
```

AG Grid comes with many themes, for example there is a dark theme version of the alpine theme:

`ag-theme-alpine-dark`

Which can be imported into the scss with:

```scss
@import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
```

At this point you should see a basic grid on screen and rendering our hard coded data.

And our `AppComponent` in `app.component.ts` looks as follows:

```javascript
import { Component } from '@angular/core';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  rowData = [
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxster', price: 72000 }
  ];

  colDefs: ColDef[] = [
    { field: 'make'},
    { field: 'model'},
    { field: 'price' }
 ];
}
```

## Loading Data via HTTP

To load data into the grid via HTTP we first need to add the Angular HTTP client.

First import it in `app.module.ts`

```typescript
import { HttpClientModule } from '@angular/common/http';
```

And add it to the module imports:

```typescript
  imports: [
    BrowserModule,
    HttpClientModule,
    AgGridModule
  ],
```

so our `app.module.ts` looks like:

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AgGridModule } from 'ag-grid-angular';
import { AppComponent } from './app.component';

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

Then in the `AppComponent` defined in `app.component.ts` replace the hardcoded `rowData` array with an `Observable`:

```typescript
  public rowData$!: Observable<any[]>;
```

Inject the HTTP client into the constructor:

```typescript
  constructor(private http: HttpClient) {}
```

Then use `ngOnInit` to setup the row data:

```typescript
  ngOnInit() {
    this.rowData$ = this.http
      .get<any[]>('https://www.ag-grid.com/example-assets/row-data.json');
  }
```

This gives us an `AppComponent` in `app.component.ts` like:

```typescript
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public rowData$!: Observable<any[]>;

  colDefs: ColDef[] = [
    { field: 'make'},
    { field: 'model'},
    { field: 'price' }
 ];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.rowData$ = this.http
      .get<any[]>('https://www.ag-grid.com/example-assets/row-data.json');
  }
}
```

We then need to amend the `app.component.html` to use the async pipe because it is now an Observable of an array:

```typescript
    [rowData]="rowData$ | async"
```

This gives us an `app.component.html` like:

```typescript
<ag-grid-angular
    style="width: 500px; height: 500px"
    class="ag-theme-alpine"
    [columnDefs]="colDefs"
    [rowData]="rowData$ | async"
  ></ag-grid-angular>
```

The Grid should now render with example data from the server.

## Sorting and Filtering

AG Grid comes with many features out of the box, so we can add 'sorting' to a column with a single property `sortable` and can add filtering with a `filter` property:

In `app.component.ts`

```typescript
export class AppComponent {
  colDefs: ColDef[] = [
    { field: 'make', sortable: true, filter: true},
```

If we add this to every column then every column in the grid can be sorted and filtered.

```typescript
  colDefs: ColDef[] = [
    { field: 'make', sortable: true, filter: true},
    { field: 'model', sortable: true, filter: true},
    { field: 'price', sortable: true, filter: true}
  ];
```

This would be clumsy to use on large data grids so we can use a default column definition in our `AppComponent` to have the common properties that we want for all columns:

```typescript
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };
```

And then add this to the grid in `app.component.html`

```html
<ag-grid-angular
    style="width: 500px; height: 500px"
    class="ag-theme-alpine"
    [columnDefs]="colDefs"
    [defaultColDef]="defaultColDef"
    [rowData]="rowData$ | async"
  ></ag-grid-angular>
```

Then we no longer need to define `sortable` and `filter` on the `colDefs`.

```typescript
  colDefs: ColDef[] = [
    { field: 'make'},
    { field: 'model'},
    { field: 'price' }
  ];
```

There are a full list of column properties in the documentation:

https://www.ag-grid.com/angular-data-grid/column-properties/

## Grid Options

In addition to Column Properties we can also configure Grid Options through properties on the grid definition.

For example we could add row selection:

```html
[rowSelection]="'multiple'"
```

Or make the grid more dynamic with `animateRows`:

```html
[animateRows]="true"
```

This will animate the rows when the user sorts the columns.


```html
<ag-grid-angular
    style="width: 500px; height: 500px"
    class="ag-theme-alpine"
    [columnDefs]="colDefs"
    [defaultColDef]="defaultColDef"
    [rowData]="rowData$ | async"
    [rowSelection]="'multiple'"
    [animateRows]="true"
  ></ag-grid-angular>
```

Grid Options can be found in the documentation:

- https://www.ag-grid.com/angular-data-grid/grid-options/

## Grid Events

The Data Grid throws events when the user interacts with the grid to allow us to write custom code to respond appropriately e.g. when the user clicks a cell.

To handle a cell click we add an event handler in the `app.component.ts`:

```javascript
onCellClicked(event: CellClickedEvent){
    console.log(event);
}
```

Remeber to import the `CellClickedEvent` from AG Grid:

```typescript
import { CellClickedEvent, ColDef } from 'ag-grid-community';
```

Then in the `app.component.html` we bind this to the grid:

```html
<ag-grid-angular
    style="width: 500px; height: 500px"
    class="ag-theme-alpine"
    [columnDefs]="colDefs"
    [defaultColDef]="defaultColDef"
    [rowData]="rowData$ | async"
    [rowSelection]="'multiple'"
    [animateRows]="true"
    (cellClicked)="onCellClicked($event)"
  ></ag-grid-angular>
```

There are many more Grid events and you can find these in the documentation:

https://www.ag-grid.com/angular-data-grid/grid-events/


## Grid API

In addition to events and properties we can gain full access to the Grid API which opens up even more runtime programmatic access to grid functionality.

First we need to gain access to the Grid using `@ViewChild` in `app.component.ts`

```typescript
@ViewChild(AgGridAngular) agGrid!: AgGridAngular
```

We can then use this in our component e.g. adding a button to clear the current selection:

```typescript
clearSelection(){
    this.agGrid.api.deselectAll();
}
```

To use this component function we need to add the button into our `app.component.html`

```html
<button (click)="clearSelection()">Clear Selection</button>
```

The full Grid API is documented in the documentation:

https://www.ag-grid.com/angular-data-grid/grid-api/

## Summary

This section was just to get started and show you how much you can achieve with AG Grid with a very small amount of code.

The AG Grid functionality is very rich so the official documentation is the best place to find all the features available.

https://www.ag-grid.com/angular-data-grid