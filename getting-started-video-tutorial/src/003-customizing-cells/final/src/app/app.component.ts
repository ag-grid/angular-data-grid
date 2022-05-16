import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ColDef, GridReadyEvent, ICellRendererParams } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { MyCellComponent, MyCellParams } from './my-cell/my-cell.component';
import { OverComponent } from './over/over.component';
import { UnderComponent } from './under/under.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public columnDefs: ColDef[] = [
    {
      field: 'athlete', 
      cellRenderer: MyCellComponent,
      cellRendererParams: {
        buttonText: 'Name'
      } as MyCellParams
    },
    {
      field: 'age', 
      cellRendererSelector: (params: ICellRendererParams) => {
        if(params.value < 25){
          return { component: UnderComponent, params: {}};
        }
        return { component: OverComponent}
      }
    },
    { field: 'country',
      cellRenderer: (params: ICellRendererParams) => {
        return `<b> !! ${params.value} </b>`
      }
  },
    { field: 'year' },
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
    //params.columnApi.autoSizeAllColumns()
  }
}
