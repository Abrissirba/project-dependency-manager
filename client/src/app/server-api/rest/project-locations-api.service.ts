import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IProjectLocation } from '../../../../../server/src/db/interfaces/i-project-location.model';

@Injectable()
export class ProjectLocationsApiService {

  private readonly API_URL = environment.restUrl + '/project-locations/';

  constructor(
    private http: HttpClient
  ) { }

  getAll() {
    return this.http.get<IProjectLocation[]>(this.API_URL);
  }

  update(projectLocation: IProjectLocation) {
    return this.http.put(this.API_URL, projectLocation);
  }

  ignore(projectLocationId: number) {
    return this.http.put<IProjectLocation>(this.API_URL + 'ignore/' + projectLocationId, null);
  }
}
