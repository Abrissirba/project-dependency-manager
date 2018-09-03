import { Action, Selector, State, StateContext } from '@ngxs/store';
import { catchError, tap } from 'rxjs/operators';
import { ProjectsApiService } from 'src/app/server-api/rest/projects.service';
import { IProject } from 'src/project-references';

export class FetchProjects {
    static readonly type = '[Projects] Fetch Projects';
    constructor() { }
}

export class SelectProject {
    static readonly type = '[Projects] Select Project';
    constructor(public id: number) { }
}

export class SaveProject {
    static readonly type = '[Projects] Save Project';
    constructor(public project: IProject) { }
}

export class AddProject {
    static readonly type = '[Projects] Add Project';
    constructor(public projectLocationId: number, public project: IProject) { }
}

export class AddProjectSuccess {
    static readonly type = '[Projects] Add Project Success';
    constructor(public projectLocationId: number, public project: IProject) { }
}

// -----projects model --------
export interface ProjectsStateModel {
    projects: IProject[];
    loaded: boolean;
    loading: boolean;
    selectedProjectId: number;
}
// --- projects state : initialState---
@State<ProjectsStateModel>({
    name: 'projectsState',
    defaults: {
        projects: [],
        loaded: false,
        loading: false,
        selectedProjectId: null
    }
})
export class ProjectsState {
    constructor(private projectApiService: ProjectsApiService) { }

    @Selector()
    static projects(state: ProjectsStateModel) {
        return state.projects;
    }

    @Selector()
    static loaded(state: ProjectsStateModel) {
        return state.loaded;
    }

    @Selector()
    static SelectedProject(state: ProjectsStateModel): IProject {
        return state.projects.find(x => x.id === state.selectedProjectId);
    }

    @Action(FetchProjects)
    fetchProjects(ctx: StateContext<ProjectsStateModel>) {
        ctx.patchState({ loading: true });
        return this.projectApiService
            .getAll()
            .pipe(
                tap(projects => {
                    ctx.patchState({
                        projects: projects,
                        loading: false,
                        loaded: true
                    })
                }),
                catchError(error => ctx.patchState({ loading: false }))
            );
    }

    @Action(AddProject)
    addProject(ctx: StateContext<ProjectsStateModel>, action: AddProject) {
        ctx.patchState({ loading: true });
        return this.projectApiService
            .add(action.projectLocationId, action.project)
            .pipe(
                tap(addedProject => {
                    let projects = ctx.getState().projects;
                    projects = [...projects, addedProject];

                    ctx.patchState({
                        projects: projects,
                        loading: false
                    });

                    ctx.dispatch(new AddProjectSuccess(action.projectLocationId, addedProject));
                }),
                catchError(error => ctx.patchState({ loading: false }))
            );
    }

    @Action(SaveProject)
    saveProject(ctx: StateContext<ProjectsStateModel>, action: SaveProject) {
        ctx.patchState({ loading: true });
        return this.projectApiService
            .save(action.project)
            .pipe(
                tap(savedProject => {
                    ctx.patchState({
                        projects: ctx.getState().projects.map(x => x.id === savedProject.id ? savedProject : x ),
                        loading: false
                    });
                }),
                catchError(error => ctx.patchState({ loading: false }))
            );
    }


    @Action(SelectProject)
    selectedProject(ctx: StateContext<ProjectsStateModel>, action: SelectProject) {
        ctx.patchState({ selectedProjectId: action.id });
    }
}

// if (!action.project.id || !stateProject) {
                        
// }
// else {
//     projects = projects.map(project => {
//         if (project.id === savedProject.id) {
//             return savedProject;
//         }
//         return project;
//     })
// }