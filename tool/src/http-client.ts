import Axios from 'axios';
import { ISyncProjectDTO } from './models';

export interface HttpClientConfig {
    serverUrl: string;
}

export class HttpClient {

    constructor(
        private config: HttpClientConfig
    ) {

    }

    send(projects: ISyncProjectDTO[]) {
        const projectLocations = projects.map(x => ({
            path: x.path,
            title: x.title
        }));

        return Axios.post(this.config.serverUrl + '/project-locations', projectLocations).then(res => {
            const filteredProjects = projects.filter(project => res.data.some(x => x.path.toLowerCase() === project.path.toLowerCase()));
            return Axios.post(this.config.serverUrl + '/projects/sync', filteredProjects);
        });
    }
}