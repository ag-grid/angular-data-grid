import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ICellRendererParams, SideBarDef, StatusPanelDef } from 'ag-grid-community';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { GoodbyeComponent, GreetTS, HelloComponent } from './cell-renderers/my-renderers';
import { MyCustomComponent, MyParams } from './my-custom/my-custom.component';

import 'ag-grid-enterprise'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  components = {
    hello: HelloComponent,
    goodbye: GoodbyeComponent
  }

  public statusBar: {
    statusPanels: StatusPanelDef[];
  } = {
      statusPanels: [
        {
          statusPanel: HelloComponent,
        },
        {
          statusPanel: GoodbyeComponent,
        },
        {
          statusPanel: 'agAggregationComponent',
          statusPanelParams: {
            aggFuncs: ['count', 'sum'],
          },
        },
      ],
    };

  public sideBar: SideBarDef = {
    toolPanels: [
      'columns',
      'filters',
      {
        id: 'customComp',
        labelDefault: 'Custom Comp',
        labelKey: 'customComp',
        iconKey: 'custom-Comp',
        toolPanel: HelloComponent,
      },
    ],
    defaultToolPanel: 'customComp',
  };

  public columnDefs: ColDef[] = [
    {
      field: 'athlete',
      cellRendererSelector: (params: ICellRendererParams) => {
        if (params.data.age < 24) {
          return {
            component: 'hello',
            params: {
              name: params.data.athlete
            }
          }
        }
        return {
          component: 'goodbye',
          params: {
            name: params.data.athlete
          }
        }
      }
    },
    {
      field: 'age',
      filter: 'agSetColumnFilter'
    },
    {
      field: 'country',
      filter: MyCustomComponent,
      filterParams: {
        name: "Filter"
      }
    },
    { field: 'year' },
    { field: 'date' },
    { field: 'sport' },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' },
  ];
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  public rowData$!: Observable<any[]>;

  constructor(private http: HttpClient) { }

  onGridReady(params: GridReadyEvent) {
    this.rowData$ = this.http
      .get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json');
    params.columnApi.autoSizeColumns(['age', 'country', 'year'])
  }
}
