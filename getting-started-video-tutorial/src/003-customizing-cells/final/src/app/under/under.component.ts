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
