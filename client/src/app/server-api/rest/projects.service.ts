import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IProject } from '../../../project-references';

@Injectable()
export class ProjectsApiService {

  private readonly API_URL = environment.restUrl + '/projects/';

  constructor(
    private http: HttpClient
  ) { }

  getAll() {
    return this.http.get<IProject[]>(this.API_URL);
  }

  add(projectLocationId: number, project: IProject) {
    return this.http.post<IProject>(this.API_URL + 'add', {
      projectLocationId,
      project,
    });
  }

  save(project: IProject) {
    return this.http.post<IProject>(this.API_URL, project);
  }
}
