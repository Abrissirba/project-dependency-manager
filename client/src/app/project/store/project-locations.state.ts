import { Action, Selector, State, StateContext } from '@ngxs/store';
import { catchError, tap } from 'rxjs/operators';
import { IProjectLocation } from '../../../../../server/src/db/interfaces/i-project-location.model';
import { ProjectLocationsApiService } from './../../server-api/rest/project-locations-api.service';
import { AddProjectSuccess, ProjectsState, ProjectsStateModel } from './projects.state';

export class FetchProjectLocations {
    static readonly type = '[Project Locations] Fetch Project Locations';
    constructor() { }
}

export class SelectProjectLocation {
    static readonly type = '[Project Locations] Select Project Location';
    constructor(public id: number) { }
}

export class AddProjectLocation {
    static readonly type = '[Project Locations] Add Project Location';
    constructor(public id: number) { }
}

export class IgnoreProjectLocation {
    static readonly type = '[Project Locations] Ignore Project Location';
    constructor(public id: number) { }
}

export class SetProjectLocationFilter {
    static readonly type = '[Project Locations] Set Project Location Filter';
    constructor(public filter: ProjectLocationsFilter) { }
}

export interface ProjectLocationsFilter {
    onlyNew: boolean;
}

// -----projectLocations model --------
export interface ProjectLocationsStateModel {
    projectLocations: IProjectLocation[];
    loaded: boolean;
    loading: boolean;
    selectedProjectLocationId: number;
    filter: ProjectLocationsFilter;
}
// --- projectLocations state : initialState---
@State<ProjectLocationsStateModel>({
    name: 'projectLocationsState',
    defaults: {
        projectLocations: [],
        loaded: false,
        loading: false,
        selectedProjectLocationId: null,
        filter: {
            onlyNew: true
        }
    }
})
export class ProjectLocationsState {
    constructor(private projectLocationApiService: ProjectLocationsApiService) { }

    @Selector([ProjectsState])
    static projectLocations(state: ProjectLocationsStateModel, projectState: ProjectsStateModel) {
        return state.projectLocations.map(projectLocation => {

            if (projectLocation.id) {
                const project = projectState.projects.find(x => x.id === projectLocation.projectId);
                projectLocation = {
                    ...projectLocation,
                    project: project || projectLocation.project
                }
            }

            return projectLocation;
        });
    }

    @Selector([ProjectLocationsState.projectLocations])
    static filteredProjectLocations(state: ProjectLocationsStateModel, projectLocations: IProjectLocation[]) {
        return projectLocations.filter(x => {
            if (state.filter.onlyNew) {
                return x.ignoreDate == null && x.projectId == null;
            }
            return true;
        })
    }

    @Selector()
    static loaded(state: ProjectLocationsStateModel) {
        return state.loaded;
    }

    @Selector()
    static SelectedProjectLocation(state: ProjectLocationsStateModel): IProjectLocation {
        return state.projectLocations.find(x => x.id === state.selectedProjectLocationId);
    }

    @Selector()
    static filter(state: ProjectLocationsStateModel) {
        return state.filter;
    }

    @Action(FetchProjectLocations)
    fetchProjectLocations(ctx: StateContext<ProjectLocationsStateModel>) {
        ctx.patchState({ loading: true });
        return this.projectLocationApiService
            .getAll()
            .pipe(
                tap(projectLocations => {
                    ctx.patchState({
                        projectLocations: projectLocations,
                        loading: false,
                        loaded: true
                    })
                }),
                catchError(error => ctx.patchState({ loading: false }))
            );
    }

    @Action(AddProjectLocation)
    addProjectLocations(ctx: StateContext<ProjectLocationsStateModel>) {
        ctx.patchState({ loading: true });
        return this.projectLocationApiService
            .getAll()
            .pipe(
                tap(projectLocations => {
                    ctx.patchState({
                        projectLocations: projectLocations,
                        loading: false,
                        loaded: true
                    })
                }),
                catchError(error => ctx.patchState({ loading: false }))
            );
    }

    @Action(AddProjectSuccess)
    addProjectSuccess(ctx: StateContext<ProjectLocationsStateModel>, action: AddProjectSuccess) {
        let projectLocations = ctx.getState().projectLocations;
        projectLocations = projectLocations.map(projectLocation => {
            if (projectLocation.id === action.projectLocationId) {
                return {
                    ...projectLocation,
                    projectId: action.project.id
                };
            }
            return projectLocation;
        })
        ctx.patchState({ projectLocations });
    }

    @Action(IgnoreProjectLocation)
    ignoreProjectLocations(ctx: StateContext<ProjectLocationsStateModel>, action: IgnoreProjectLocation) {
        ctx.patchState({ loading: true });
        return this.projectLocationApiService
            .ignore(action.id)
            .pipe(
                tap(projectLocation => {
                    ctx.patchState({
                        projectLocations: ctx.getState().projectLocations.map(x => x.id === projectLocation.id ? projectLocation : x )
                    })
                }),
                catchError(error => ctx.patchState({ loading: false }))
            );
    }


    @Action(SelectProjectLocation)
    selectedProjectLocation(ctx: StateContext<ProjectLocationsStateModel>, action: SelectProjectLocation) {
        ctx.patchState({ selectedProjectLocationId: action.id });
    }

    @Action(SetProjectLocationFilter)
    setProjectLocationFilter(ctx: StateContext<ProjectLocationsStateModel>, action: SetProjectLocationFilter) {
        ctx.patchState({ filter: action.filter });
    }
}