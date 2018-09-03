import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IProjectLocation } from '../../../../../../server/src/db/interfaces/i-project-location.model';
import { OnDestroyComponent } from '../../../ui';
import { DialogHelperService } from '../../../ui/dialog-helper';
import { AddProject, FetchProjectLocations, IgnoreProjectLocation, ProjectLocationsFilter, ProjectLocationsState, SetProjectLocationFilter } from '../../store';
import { EditProjectDialogComponent } from '../edit-project-dialog/edit-project-dialog.component';

@Component({
  selector: 'app-project-location-page',
  templateUrl: './project-location-page.component.html',
  styleUrls: ['./project-location-page.component.scss']
})
export class ProjectLocationPageComponent extends OnDestroyComponent implements OnInit {

  @Select(ProjectLocationsState.filteredProjectLocations) projectLocations$: Observable<IProjectLocation[]>;

  @Select(ProjectLocationsState.filter) filter$: Observable<ProjectLocationsFilter>;

  projectLocationFilterFormGroup: FormGroup;

  constructor(
    private store: Store,
    private dialogHelperService: DialogHelperService
  ) {
    super();
    this.store.dispatch(new FetchProjectLocations());
  }

  ngOnInit() {
    this.initProjectLocationFilterFormGroup();
  }

  onProjectLocationClick(projectLocation: IProjectLocation) {

  }

  onAddProjectLocation(projectLocation: IProjectLocation) {
    this.dialogHelperService.open(EditProjectDialogComponent, {
      data: {
        title: projectLocation.title,
        description: null
      }
    }).afterClosed().subscribe(res => {
      if (res) {
        this.store.dispatch(new AddProject(projectLocation.id, {
          ...res,
          hasPackageLockFile: false,
          dependencies: [],
        }))
      }
    });
  }

  onIgnoreProjectLocation(projectLocation: IProjectLocation) {
    if (projectLocation.project) {
      this.dialogHelperService.confirm({
        message: 'Do you want to ignore ' + projectLocation.path,
        ok: 'Yes',
        cancel: 'No'
      }).afterClosed().subscribe(res => {
        if (res) {
          this.store.dispatch(new IgnoreProjectLocation(projectLocation.id));
        }
      })
    }
    else {
      this.store.dispatch(new IgnoreProjectLocation(projectLocation.id));
    }
  }

  initProjectLocationFilterFormGroup() {
    this.projectLocationFilterFormGroup = new FormGroup({
      onlyNew: new FormControl(this.store.selectSnapshot(state => state.projectLocationsState.filter.onlyNew))
    });

    this.projectLocationFilterFormGroup.valueChanges.pipe(takeUntil(this.destroy)).subscribe(res => this.store.dispatch(new SetProjectLocationFilter(res)));
  }

}
