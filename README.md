# angular-data-grid

Angular Data Grid Examples Used on the AG Grid Blog.

https://blog.ag-grid.com/tag/angular/

Demo of Angular Grid Component integration into an Angular project

------

- [Get started in 5 minutes](https://blog.ag-grid.com/get-started-with-angular-grid-in-5-minutes/)
- [Customise Data Grid - custom filter, editor and cell-renderer](https://blog.ag-grid.com/learn-to-customize-angular-grid-in-less-than-10-minutes/)

ag-Grid is a fully-featured and highly customizable JavaScript data grid.

It delivers [outstanding performance](https://www.ag-grid.com/example.php), has no 3rd party dependencies and integrates smoothly with Angular as Angular Component. 


## Getting Started with Angular Data Grid Video Tutorials

A series of videos showing how to get started with AG Grid and Angular.

All videos are available in a playlist:

https://www.youtube.com/playlist?list=PLsZlhayVgqNw6VHFn4j6FcJM5vLACsf0x

And directly available below:

- 001 - QuickStart Guide
    - https://youtu.be/_cRDVM6NlPk
- 002 - Enterprise Overview
    - https://youtu.be/xe6i3W6qW5k
- 003 - Customizing Cells
    - https://youtu.be/xsafnM77NVs
- 004 - Custom Component Overview
    - https://youtu.be/A5-Li_9oPSE	


Source code for all videos is available on Github:

https://github.com/ag-grid/angular-data-grid/tree/main/getting-started-video-tutorial


Features
--------------

Besides the standard set of features you'd expect from any grid:

* Column Interactions (resize, reorder, and pin columns)
* Pagination
* Sorting
* Row Selection

Here are some of the features that make ag-Grid stand out:

* Grouping / Aggregation*
* Custom Filtering
* In-place Cell Editing
* Records Lazy Loading *
* Server-Side Records Operations *
* Live Stream Updates
* Hierarchical Data Support & Tree View *
* Customizable Appearance
* Customizable Cell Contents
* Excel-like Pivoting *
* State Persistence
* Keyboard navigation
* Data Export to CSV
* Data Export to Excel *
* Row Reordering
* Copy / Paste 
* Column Spanning
* Pinned Rows
* Full Width Rows

\* The features marked with an asterisk are available in the [enterprise version](https://www.ag-grid.com/license-pricing.php) only.

Check out [developers documentation](https://www.ag-grid.com/angular-data-grid/) for a complete list of features or visit [our official docs](https://www.ag-grid.com/features-overview) for tutorials and feature demos.

Usage Overview
--------------

Use the setup instructions below or go through [a 5-minute-quickstart guide](https://www.ag-grid.com/angular-data-grid/getting-started/).

#### To use this demo:

- `cd integration-demo`
- `npm install`
- `npm start`

#### Install dependencies

    $ npm i --save ag-grid-community ag-grid-angular

#### Import `AgGridModule` and add it to the `App` module

	import { AgGridModule } from 'ag-grid-angular';

	@NgModule({
	  declarations: [AppComponent],
	  imports: [BrowserModule, AgGridModule.withComponents([])],
	  providers: [],
	  bootstrap: [AppComponent]
	})
	export class AppModule {}

### Import styles in `styles.css`

    @import "~ag-grid/dist/styles/ag-grid.css";
    @import "~ag-grid/dist/styles/ag-theme-balham.css";

### Set the grid's configuration in a parent component

	export class AppComponent {
		title = 'app';

		columnDefs = [
			{headerName: 'Make', field: 'make' },
			{headerName: 'Model', field: 'model' },
			{headerName: 'Price', field: 'price'}
		];

		rowData = [
			{ make: 'Toyota', model: 'Celica', price: 35000 },
			{ make: 'Ford', model: 'Mondeo', price: 32000 },
			{ make: 'Porsche', model: 'Boxter', price: 72000 }
		];
	}

### Render the grid as the `ag-grid-angular` child component

	<ag-grid-angular 
		style="width: 500px; height: 500px;" 
		class="ag-theme-balham"
		[rowData]="rowData" 
		[columnDefs]="columnDefs">
	</ag-grid-angular>

Issue Reporting
----------
If you have found a bug, please report them at this repository `issues` section. If you're using Enterprise version please use the private ticketing system to do that.


Asking Questions
-------------

Look for similar problems on [StackOverflow](https://stackoverflow.com/questions/tagged/ag-grid) using the `ag-grid` tag. If nothing seems related, post a new message there. Do not use GitHub issues to ask questions.

Contributing
------------
ag-Grid is developed by a team of co-located developers in London. If you want to join the team check out our [jobs listing](https://www.ag-grid.com/ag-grid-jobs-board) or send your application to info@ag-grid.com.

License
------------------
This project is licensed under the MIT license.
