import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { map, takeUntil } from 'rxjs/operators';
import { IProject } from '../../../../../../server/src/db/interfaces/i-project.model';
import { OnDestroyComponent } from '../../../ui';


@Component({
  selector: 'app-project-table',
  templateUrl: './project-table.component.html',
  styleUrls: ['./project-table.component.scss']
})
export class ProjectTableComponent extends OnDestroyComponent implements AfterViewInit {


  private _projects: IProject[];
  @Input() get projects() { return this._projects; }
  set projects(val) {
    this._projects = val || [];
    this.dataSource.data = val || [];
  }

  @Output() projectClick = new EventEmitter();

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  columns = ['title', 'projectLocationPath', 'description', 'hasPackageLockFile', 'createdDate', 'modifiedDate'];
  displayedColumns = [...this.columns];
  dataSource: MatTableDataSource<IProject>;

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
        this.displayedColumns = ['title', 'projectLocationPath', 'modifiedDate'];
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

  onRowClick(project: IProject) {
    this.projectClick.next(project);
  }
}
