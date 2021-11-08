import {Component, OnInit} from '@angular/core';
import {NumberFormatterComponent} from './number-formatter.component';
import {NumericEditorComponent} from './numeric-editor.component';
import {RangeFilterComponent} from './range-filter.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  columnDefs = [
    {headerName: 'Make', field: 'make'},
    {headerName: 'Model', field: 'model'},
    {
      headerName: 'Price',
      field: 'price',
      editable: true,
      cellRenderer: 'numberFormatterComponent',
      cellEditor: 'numericEditorComponent',
      filter: 'rangeFilterComponent'
    }
  ];

  rowData = [];

  frameworkComponents = {
    numberFormatterComponent: NumberFormatterComponent,
    numericEditorComponent: NumericEditorComponent,
    rangeFilterComponent: RangeFilterComponent
  };

  ngOnInit() {
    fetch('https://api.myjson.com/bins/15psn9')
      .then(result => result.json())
      .then(rowData => this.rowData = rowData);
  }
}
