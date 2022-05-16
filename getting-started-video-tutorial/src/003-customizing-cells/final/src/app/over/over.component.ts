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
