# Cell Renderers

This section will help you get started in customizing the way that cells can render data using Cell Renderers. These are simple Angular components which control how the HTML in a cell is generated and allow formatting and adding extra features like buttons or other functional elements in a cell. In fact anything that you could put in an Angular component you could render into a cell in the grid.

## Tutorial Video

https://youtu.be/xsafnM77NVs

- 00:00 Starting Code
- 00:30 Use CLI to create component
- 02:38 Functional Cell Renderers
- 03:25 Reusing Cell Renderer Components
- 06:10 Selecting Cell Renderers
- 07:25 Inline Cell Renderer
- 07:50 Summary

## Starting Code

The main starting point for this section is a simple `AppComponent` in `app.component.ts` which uses AG Grid to render data from a server call.

```typescript
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
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
  };
  
  public rowData$!: Observable<any[]>;

  constructor(private http: HttpClient) {}

  onGridReady(params: GridReadyEvent) {
    this.rowData$ = this.http
      .get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json');
  }
}
```

And the HTML for the component in `app.component.html` is:

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

## Use CLI to create component

Since a Cell Renderer is just an Angular component we can use the standard CLI as a way to create our component.

```shell
ng g c myCell --inline-style --inline-template
```

The above code will create the basic files required for our component and updated the `app.module.ts` so that we can use it.

The first thing we need to do is may sure that our component implements the interface `ICellRendererAngularComp`:

```javascript
export class MyCellComponent implements OnInit, ICellRendererAngularComp {
```

And now we can start amending the component to be more functional.

```typescript
import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-my-cell',
  template: `
    <p>
      my-cell works!
    </p>
  `,
  styles: [
  ]
})

export class MyCellComponent implements OnInit, ICellRendererAngularComp {
  
  agInit(params: ICellRendererParams): void { 
    throw new Error('Method not implemented.');
  }
  
  refresh(params: ICellRendererParams): boolean {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
  }

}

```

We then have to implement the methods `agInit` and `refresh`.

AG Grid calls `agInit` when it wants to instantiate the component in the cell. AG Grid passes in a `params` argument which contains all the data the cell could require, including access to the grid API.

Initially we will create a cell renderer that simply renders the data for the cell.

```javascript

  value: any;

  agInit(params: ICellRendererParams): void {
    this.value = params.value   
  }
```

Then amend the template to display the value we stored in the `value` property.

```javascript
@Component({
  selector: 'app-my-cell',
  template: `
    {{value}}
  `,
  styles: [
  ]
})
```

Most of the time when implementing a Cell Renderer component you will want the `refresh` method to return false, then AG Grid will recreate the component when required. Returning `true` means that AG Grid will not recreate your component.

```javascript
  refresh(params: ICellRendererParams): boolean {
    return false;
  }
```

This is enough to create a basic Cell Renderer that we can use in AG Grid. Admittedly all it will do is render the value, but we can build on this.

```javascript
@Component({
  selector: 'app-my-cell',
  template: `
    {{value}}
  `,
  styles: [
  ]
})
export class MyCellComponent implements OnInit, ICellRendererAngularComp {
  
  value: any;
  
  agInit(params: ICellRendererParams): void {
    this.value = params.value   
  }
  
  refresh(params: ICellRendererParams): boolean {
    return false;
  }

  ngOnInit(): void {
  }

}
```

Now, to make the data grid instance use the Cell Renderer we amend the `app.component.ts` to configure one of the columns to use it.

```javascript
    {field: 'athlete', cellRenderer: MyCellComponent},
```

This configures the '`athlete` field to use the component `MyCellComponent` as a Cell Renderer.

At this point the grid will be using the Cell Renderer but you wouldn't notice.

To make it obvious change the `template` in the `my-cell.component.ts` to use a `#` in front of the value.

```javascript
  template: `
    # {{value}}
  `,
```

Now the `#` will be visible in the cell and it is obvious that our Cell Renderer is being used.

## Functional Cell Renderers

To make the cell renderer more interesting we will add a `button` into the cell renderer.

First amend the template in `my-cell.component.ts` to have the HTML and click handler for a button

```javascript
@Component({
  selector: 'app-my-cell',
  template: `
    <button (click)="onClick($event)" >Click</button> {{value}}
  `,
  styles: [
  ]
})
```

This will render a `[Click]` button before the `value` in the cell.

Next we need to write the code for the `onClick` event handler.

```javascript
  onClick(event: any){
    alert('Cell value is ' + this.value);
  }
```

The Data Grid will now show a button in the `athlete` column and when clicked will show an alert that displays the value of the cell.

## Reusing Cell Renderer Components

Cell Renderer components can be re-used easily by adding them as the `cellRenderer` to the field definition.


```javascript
    { field: 'athlete', cellRenderer: MyCellComponent},
    { field: 'age', cellRenderer: MyCellComponent},
```

We can make components more useful for re-use by passing some configuration parameters to the component.

For example we could set the text of the button by passing in the button text as a parameter:

```javascript
    {
      field: 'athlete', 
      cellRenderer: MyCellComponent,
      cellRendererParams: {
        buttonText: 'Name'
      }
    },
    {
      field: 'age', 
      cellRenderer: MyCellComponent,
      cellRendererParams: {
        buttonText: 'Age'
      }
    },    
```

This parameter will be passed in to the component as part of the `params` so we can access it in the `my-cell.component.ts`.

First we need to create and set a property which is passed in as the `params`.

```
  buttonText: string = 'Default';

  agInit(params: ICellRendererParams & MyCellParams): void {
   this.value = params.value
   this.buttonText = params.buttonText ?? 'Default';
  }
```

Then we need to render it in the component template:

```javascript
@Component({
  selector: 'app-my-cell',
  template: `
    <button (click)="onClick($event)" >{{buttonText}}</button> {{value}}
  `,
  styles: [
  ]
})
```

We also need to create the type we used in the `init`:

```javascript
export interface MyCellParams {
  buttonText?: string;
}
```

Our final component would become:

```javascript
import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

export interface MyCellParams {
  buttonText?: string;
}

@Component({
  selector: 'app-my-cell',
  template: `
    <button (click)="onClick($event)" >{{buttonText}}</button> {{value}}
  `,
  styles: [
  ]
})
export class MyCellComponent implements OnInit, ICellRendererAngularComp {

  value: any;
  buttonText: string = 'Default';

  agInit(params: ICellRendererParams & MyCellParams): void {
   this.value = params.value
   this.buttonText = params.buttonText ?? 'Default';
  }

  refresh(params: ICellRendererParams & MyCellParams): boolean {
    return false;
  }

  onClick(event: any){
    alert('Cell value is ' + this.value);
  }

  ngOnInit(): void {
  }

}
```

A final step is to cast the cellRendererParams as `MyCellParams` to support autocompletion in our IDE when we use the custom component as a cell renderer.

```javascript
    {
      field: 'athlete', 
      cellRenderer: MyCellComponent,
      cellRendererParams: {
        buttonText: 'Name'
      } as MyCellParams
    },
    {
      field: 'age', 
      cellRenderer: MyCellComponent,
      cellRendererParams: {
        buttonText: 'Age'
      } as MyCellParams
    },    
```

## Selecting Cell Renderers

It can be sometimes useful to use different Cell Renderers for different values in the cell. e.g. if a value is over a specific amount then have a different cell renderer.

In practice this looks like the code below:

```javascript
    {
      field: 'age', 
      cellRendererSelector: (params: ICellRendererParams) => {
        if(params.value < 25){
          return { component: UnderComponent, params: {}};
        }
        return { component: OverComponent}
      }
    },
```

Here the `age` field has a `cellRendererSelector` this takes the same parameters as the Cell Renderer so it is possible to have complex logic and functionality in this selector.

In this code are are returning an `UnderComponent` Cell Renderer if the value of the cell is less than 25, and an `OverComponent` Cell Renderer by default.

It is possible to pass parameters to the returned Cell Renderers, as we saw before when we used `cellRendererParams` e.g.

```javascript
    return { component: UnderComponent, params: {}};
```

Any embedded `params` will be used instead of the `cellRendererParams`.

For completeness, the `UnderComponent` and `OverComponent` are shown below. These were created in the same way as before, using the CLI and then amended.

The `OverComponent`:

```javascript
import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-my-cell',
  template: `
    <b>Over</b> {{value}}
  `,
  styles: [
    `b {
      color: green
    }`
  ]
})
export class OverComponent implements ICellRendererAngularComp {

  value: any;

  agInit(params: ICellRendererParams): void {
   this.value = params.value
  }

  refresh(params: ICellRendererParams): boolean {
    return false;
  }
}
```

The `UnderComponent`:

```javascript
import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-my-cell',
  template: `
    <b>Under</b> {{value}}
  `,
  styles: [
    `b {
      color: red
    }`
  ]
})
export class UnderComponent implements ICellRendererAngularComp {

  value: any;

  agInit(params: ICellRendererParams): void {
   this.value = params.value
  }

  refresh(params: ICellRendererParams): boolean {
    return false;
  }
}
```

## Inline Cell Renderer

For those moments where creating a full component is over kill, it is possible to create a `cellRenderer` as a function which returns an HTML string.

```javascript
    { field: 'country',
      cellRenderer: (params: ICellRendererParams) => {
        return `<b> !! ${params.value} </b>`
      }
    },
```

## Summary

It is possible to customize the cells of AG Grid to be as flexible as required. The Cell Renderers are either normal Angular components or simple functions which return HTML. The Cell Renderers receive `params` which provide access to all the data values in the row, as well as the cell, and access to the Grid's API.

If you want to perform conditional selection of the cell renderer then the `cellRendererSelector` is available to provide a convenient mechanism for simplifying the selection.