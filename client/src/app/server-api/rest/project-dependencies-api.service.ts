import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IProjectDependency } from '../../../project-references';

@Injectable()
export class ProjectDependenciesApiService {

  private readonly API_URL = environment.restUrl + '/project-dependencies/';

  constructor(
    private http: HttpClient
  ) { }

  getAll() {
    return this.http.get<IProjectDependency[]>(this.API_URL);
  }
}
