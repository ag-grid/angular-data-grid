import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp, IHeaderAngularComp } from 'ag-grid-angular';
import { IHeaderParams } from 'ag-grid-community';
import { ICellRendererParams } from 'ag-grid-community';

export interface MyParams {
  name?: string;
}

@Component({
  selector: 'app-my-custom',
  template: `
      my-custom {{name}} works!
  `,
})
export class MyCustomComponent implements IHeaderAngularComp {

  name?: string;
  refresh(params: IHeaderParams): boolean {
    return false;
  }
  agInit(params: IHeaderParams & MyParams): void {
    this.name = params.name;
  }
}
