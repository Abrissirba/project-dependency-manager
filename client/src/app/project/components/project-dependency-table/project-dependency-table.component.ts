import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { map, takeUntil } from 'rxjs/operators';
import { IProjectDependency } from 'src/project-references';
import { OnDestroyComponent } from '../../../ui';


@Component({
  selector: 'app-project-dependency-table',
  templateUrl: './project-dependency-table.component.html',
  styleUrls: ['./project-dependency-table.component.scss']
})
export class ProjectDependencyTableComponent extends OnDestroyComponent implements AfterViewInit {

  private _projectDependencies: IProjectDependency[];
  @Input() get projectDependencies() { return this._projectDependencies; }
  set projectDependencies(val) {
    this._projectDependencies = val || [];
    this.dataSource.data = val || [];
  }

  @Output() projectDependencyClick = new EventEmitter();

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  columns = ['title', 'license', 'currentVersion', 'installedVersion', 'newVersion', 'type', 'createdDate', 'modifiedDate'];
  displayedColumns = [...this.columns];
  dataSource: MatTableDataSource<IProjectDependency>;

  formGroup: FormGroup;

  constructor(
    private breakpointObserver: BreakpointObserver,
  ) {
    super();
    this.dataSource = new MatTableDataSource([]);
    this.dataSource.filterPredicate = (projectDependency, filter) => {
      return projectDependency.dependency.key.toLowerCase().indexOf(filter) !== -1
        || ( projectDependency.dependency.license && projectDependency.dependency.license.toLowerCase().indexOf(filter) !== -1)
    }

    this.breakpointObserver.observe([Breakpoints.Handset]).pipe(
      map(res => res.matches),
      takeUntil(this.destroy)
    ).subscribe(res => {
      if (res) {
        this.displayedColumns = ['title', 'currentVersion', 'newVesrion'];
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

  onRowClick(projectDependency: IProjectDependency) {
    this.projectDependencyClick.next(projectDependency);
  }
}
