import {Component} from "@angular/core";
import {Track} from "@data-logic/models/track.model";
import {map, Observable, startWith} from "rxjs";
import {FormControl, FormGroup} from "@angular/forms";
import {AppRoutes} from "@app-logic/enums/app-routes.enum";
import {TrackService} from "@data-logic/services/track.service";
import {DatePipe} from "@angular/common";
import {ProjectService} from "@data-logic/services/project.service";
import {LoggerService} from "@app-logic/services/logger.service";
import {Project} from "@data-logic/models/project.model";
import {TimesPerProject} from "@data-logic/models/times-per-project.model";

@Component({
  selector: 'home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss']
})
export class HomeComponent {
  projectOptions: string[] = []; //["f-app", "p-hub", "nature", "BITS", "lernen"]; //TODO

  timesPerProject: TimesPerProject[] = [];

  // projectControl = new FormControl('')

  workedToday: string = "";

  protected readonly AppRoutes = AppRoutes;

  public trackForm: FormGroup = new FormGroup({
    start: new FormControl(this.datePipe.transform(this.trackService.begin, 'HH:mm')),
    end: new FormControl(null),
    project: new FormControl(''),
    comment: new FormControl(''),
    doTrackUntilNow: new FormControl(true),
  });

  constructor(public trackService: TrackService,
              private datePipe: DatePipe,
              private projectService: ProjectService) {
  }

  ngOnInit() {
    this.trackService.trackedTime$.subscribe((track: Track) => {
      this.trackForm.get('comment')!.setValue('');
      this.trackForm.get('start')!.setValue(this.datePipe.transform(this.trackService.begin, 'HH:mm'));
      this.trackForm.get('end')!.setValue(null);
    });

    this.filteredProjects = this.trackForm.get('project')!.valueChanges.pipe(
      startWith(''),
      map((value: any) => this.projectFilter(value || '')),
    );

    this.getWorkedToday();
    this.trackService.getWorkedInProjectsOnDay(new Date()).then((timesPerProject) => {
      this.timesPerProject = timesPerProject;
    });

    //TODO avoid duplicate call: run getProjects on subscribe
    this.getProjects();
    this.projectService.newProjectAdded$.subscribe(() => {
      this.getProjects();
    });
  }

  track() {
    if (!this.projectOptions.includes(this.trackForm.get('project')?.value)) {
      this.projectService.addProject(this.trackForm.get('project')?.value);
    }

    this.trackService.trackTime(
      this.trackForm.get('project')?.value || '',
      this.trackForm.get('start')?.value ? this.dateFromTime(this.trackForm.get('start')?.value) : null,
      this.getEnd(),
      this.trackForm.get('comment')?.value);
    this.getWorkedToday();
    this.trackService.getWorkedInProjectsOnDay(new Date()).then((timesPerProject) => {
      this.timesPerProject = timesPerProject;
    });
  }

  getEnd() {
    let end;
    if (this.trackForm.get('doTrackUntilNow')!.value) {
      end = new Date();
    } else {
      end = this.trackForm.get('end')?.value ? this.dateFromTime(this.trackForm.get('end')?.value) : new Date();
    }
    return end;
  }

  dateFromTime(time: string) {
    const [hours, minutes] = time.split(':').map(Number);
    const currentDate = new Date();
    currentDate.setHours(hours);
    currentDate.setMinutes(minutes);
    return currentDate;
  }

  getTimeBetweenAsString(start: Date, end: Date) {
    const diff = end.getTime() - start.getTime();

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  getProjects() {
    this.projectService.getProjects().then((projects) => {
      LoggerService.debug("Read projects from disk", projects);
      if (!projects) projects = [];
      this.projectOptions = projects.map((project) => project.name);
    });
  }

  getDoTrackUntilNow() {
    return this.trackForm.get('doTrackUntilNow')!.value;
  }






  isStarted = false;
  startPomodoro() {
    this.isStarted = true;
    setTimeout(() => {
      new Audio("assets/10.wav").play();
      this.isStarted = false;
    }, 25*60*1000);
  }

  filteredProjects!: Observable<string[]>;
  private projectFilter(project: string): string[] {
    const filterValue = project.toLowerCase();
    return this.projectOptions.filter(option => option.toLowerCase().includes(filterValue));
  }

  async getWorkedToday() {
    this.workedToday = await this.trackService.getWorkedOnDay(new Date());
  }


}
