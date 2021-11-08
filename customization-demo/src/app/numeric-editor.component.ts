import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {ICellEditorAngularComp, ICellRendererAngularComp} from 'ag-grid-angular';

@Component({
  selector: 'app-numeric-editor-cell',
  template: `
    <input #i [value]="params.value" (keypress)="onKeyPress($event)" (keydown)="onKeyDown($event)"/>
  `
})
export class NumericEditorComponent implements AfterViewInit {
  @ViewChild('i') textInput;
  params;

  ngAfterViewInit() {
    setTimeout(() => {
      this.textInput.nativeElement.focus();
    });
  }

  agInit(params: any): void {
    this.params = params;
  }

  getValue() {
    return this.textInput.nativeElement.value;
  }

  onKeyPress(event) {
    if (!isNumeric(event)) {
      event.preventDefault();
    }

    function isNumeric(ev) {
      return /\d/.test(ev.key);
    }
  }

  onKeyDown(event) {
    if (event.keyCode === 39 || event.keyCode === 37) {
      event.stopPropagation();
    }
  }
}
