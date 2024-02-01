import {EventEmitter, Injectable} from "@angular/core";
import {LoggerService} from "@app-logic/services/logger.service";
import {Project} from "@data-logic/models/project.model";

@Injectable({providedIn: 'root'})
export class ProjectService {

  newProjectAdded$ = new EventEmitter<string>();

    constructor() {
    }

    async getProjects() {
      return await window.electronAPI.getProjects() || [];
    }

    async addProject(project: string) {
      try {
        await window.electronAPI.addProject(new Project(project));
        this.newProjectAdded$.emit();
      } catch (e) {
        LoggerService.error("Error adding project", e);
      }
    }

    async deleteProject(project: string) {
      return await window.electronAPI.deleteProject(project);
    }

    async updateProject(oldProjectName: string, newProject: Project) {
      return await window.electronAPI.updateProject(oldProjectName, newProject);
    }
}
