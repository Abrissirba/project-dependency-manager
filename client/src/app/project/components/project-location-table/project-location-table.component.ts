import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { map, takeUntil } from 'rxjs/operators';
import { IProjectLocation } from '../../../../../../server/src/db/interfaces/i-project-location.model';
import { OnDestroyComponent } from '../../../ui';

@Component({
  selector: 'app-project-location-table',
  templateUrl: './project-location-table.component.html',
  styleUrls: ['./project-location-table.component.scss']
})
export class ProjectLocationTableComponent extends OnDestroyComponent implements AfterViewInit {

  private _projectLocations: IProjectLocation[];
  @Input() get projectLocations() { return this._projectLocations; }
  set projectLocations(val) {
    this._projectLocations = val || [];
    this.dataSource.data = val || [];
  }

  @Output() projectLocationClick = new EventEmitter();

  @Output() add = new EventEmitter();

  @Output() ignore = new EventEmitter();

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  columns = ['title', 'path', 'project', 'ignoreDate', 'createdDate'];
  displayedColumns = [...this.columns];
  dataSource: MatTableDataSource<IProjectLocation>;

  formGroup: FormGroup;

  constructor(
    private breakpointObserver: BreakpointObserver,
  ) {
    super();
    this.dataSource = new MatTableDataSource([]);
    this.breakpointObserver.observe([Breakpoints.Handset]).pipe(
      map(res => res.matches),
      takeUntil(this.destroy)
    ).subscribe(res => {
      if (res) {
        this.displayedColumns = ['title', 'path', 'project'];
      }
      else {
        this.displayedColumns = [...this.columns];
      }
    })
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  onSearch(val) {
    val = val.trim().toLowerCase();
    this.dataSource.filter = val;
  }

  onAddClick(projectLocation: IProjectLocation) {
    this.add.next(projectLocation);
  }

  onIgnoreClick(projectLocation: IProjectLocation) {
    this.ignore.next(projectLocation);
  }

  onRowClick(projectLocation: IProjectLocation) {
    this.projectLocationClick.next(projectLocation);
  }

}
