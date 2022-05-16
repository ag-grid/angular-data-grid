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
