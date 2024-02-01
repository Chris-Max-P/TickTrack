import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {Project} from "@data-logic/models/project.model";
import {LoggerService} from "@app-logic/services/logger.service";
import {ProjectService} from "@data-logic/services/project.service";
import {AppRoutes} from "@app-logic/enums/app-routes.enum";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  standalone: true,
  imports: [
    NgForOf,
    RouterLink
  ],
})
export class ProjectsComponent {
  projects: Project[] = [];

  constructor(private projectService: ProjectService) {
    this.getProjects();
  }

  getProjects() {
    this.projectService.getProjects().then((projects) => {
      LoggerService.debug("Read projects from disk", projects);
      if (!projects) projects = [];
      this.projects = projects;
    });
  }

  updateProjectTrackingStatus(project: Project, event: any) {
    project.isTracked = event.target.checked;
    this.projectService.updateProject(project.name, project).then(() => {
      LoggerService.debug("Updated project tracking status", project);
    });
  }

  protected readonly AppRoutes = AppRoutes;
}
