import { Action, Selector, State, StateContext } from '@ngxs/store';
import { catchError, tap } from 'rxjs/operators';
import { ProjectDependenciesApiService } from 'src/app/server-api/rest/project-dependencies-api.service';
import { IProjectDependency } from 'src/project-references';

export class FetchProjectDependencies {
    static readonly type = '[Project Dependencies] Fetch ProjectDependencys';
    constructor() { }
}

// -----projects model --------
export interface ProjectDependenciesStateModel {
    projectDependencies: IProjectDependency[];
    loaded: boolean;
    loading: boolean;
}
// --- projects state : initialState---
@State<ProjectDependenciesStateModel>({
    name: 'projectDependenciesState',
    defaults: {
        projectDependencies: [],
        loaded: false,
        loading: false,
    }
})
export class ProjectDependenciesState {
    constructor(private projectDependenciesApiService: ProjectDependenciesApiService) { }

    @Selector()
    static projectDependencies(state: ProjectDependenciesStateModel) {
        return state.projectDependencies;
    }

    @Selector()
    static loaded(state: ProjectDependenciesStateModel) {
        return state.loaded;
    }


    @Action(FetchProjectDependencies)
    fetchProjectDependencys(ctx: StateContext<ProjectDependenciesStateModel>) {
        ctx.patchState({ loading: true });
        return this.projectDependenciesApiService
            .getAll()
            .pipe(
                tap(projectDependencies => {
                    ctx.patchState({
                        projectDependencies: projectDependencies,
                        loading: false,
                        loaded: true
                    })
                }),
                catchError(error => ctx.patchState({ loading: false }))
            );
    }

}