import {AfterViewInit, Component, ViewChild} from '@angular/core';

@Component({
  selector: 'app-range-filter-cell',
  template: `
    <form (submit)="onSubmit($event)">
      <input #i name="filter" [value]="filter"/>
      <button>Apply</button>
    </form>
  `
})
export class RangeFilterComponent implements AfterViewInit {
  @ViewChild('i') textInput;
  filter = '';
  params: any;

  agInit(params: any): void {
    this.params = params;
  }

  isFilterActive() {
    return this.filter !== '';
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.textInput.nativeElement.focus();
    });
  }

  doesFilterPass(params) {
    const filter = this.filter.split('-');
    const gt = Number(filter[0]);
    const lt = Number(filter[1]);
    const value = this.params.valueGetter(params.node);

    return value >= gt && value <= lt;
  }

  getModel() {
    return {filter: this.filter};
  }

  setModel(model) {
    this.filter = model ? model.filter : '';
  }

  onSubmit(event) {
    event.preventDefault();

    const filter = event.target.elements.filter.value;

    if (this.filter !== filter) {
      this.filter = filter;
      this.params.filterChangedCallback();
    }
  }
}
