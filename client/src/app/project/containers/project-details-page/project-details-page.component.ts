import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { IProject } from '../../../../project-references';
import { OnDestroyComponent } from '../../../ui';
import { FetchProjects, ProjectsState, SaveProject, SelectProject } from '../../store';
import { EditProjectDialogComponent } from '../edit-project-dialog/edit-project-dialog.component';
import { DialogHelperService } from './../../../ui/dialog-helper/dialog-helper.service';

@Component({
  selector: 'app-project-details-page',
  templateUrl: './project-details-page.component.html',
  styleUrls: ['./project-details-page.component.scss']
})
export class ProjectDetailsPageComponent extends OnDestroyComponent implements OnInit {

  @Select(ProjectsState.SelectedProject) project$: Observable<IProject>;
  
  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private dialogHelperService: DialogHelperService
  ) { 
    super();
    this.store.dispatch(new FetchProjects());
    this.route.params.pipe(this.takeUntilDestroyed).subscribe(res => this.store.dispatch(new SelectProject(Number(res['id']))))
  }

  ngOnInit() {
  }

  onEdit(project: IProject) {
    this.dialogHelperService.open(EditProjectDialogComponent, {
      data: project
    }).afterClosed().subscribe(res => {
      if (res) {
        this.store.dispatch(new SaveProject({
          ...project,
          ...res,
        }))
      }
    });
  }

}
