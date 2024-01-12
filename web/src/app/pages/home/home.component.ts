import {Component} from "@angular/core";
import {Track} from "@data-logic/models/track.model";
import {map, Observable, startWith} from "rxjs";
import {FormControl, FormGroup} from "@angular/forms";
import {AppRoutes} from "@app-logic/enums/app-routes.enum";
import {TrackService} from "@data-logic/services/track.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss']
})
export class HomeComponent {
  projectOptions = ["f-app", "p-hub", "nature", "BITS", "lernen"]; //TODO

  timesPerProject: Map<string, {worked: number, comments: string}> = new Map<string, {worked: number, comments: string}>();

  // projectControl = new FormControl('')

  workedToday: string = "";
  doTrackUntilNow = true;

  protected readonly AppRoutes = AppRoutes;

  public trackForm: FormGroup = new FormGroup({
    start: new FormControl(this.datePipe.transform(this.trackService.begin, 'HH:mm')),
    end: new FormControl(null),
    project: new FormControl(''),
    comment: new FormControl(''),
  });

  constructor(public trackService: TrackService,
              private datePipe: DatePipe) {
  }

  ngOnInit() {

    this.trackService.trackedTime$.subscribe((track: Track) => {
      this.trackForm.get('comment')!.setValue('');
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
  }

  track() {
    this.trackService.trackTime( //TODO variable start date by user input
      this.trackForm.get('project')?.value || '',
      this.trackForm.get('end')?.value ? this.dateFromTime(this.trackForm.get('end')?.value) : new Date(),
      this.trackForm.get('comment')?.value);
    this.getWorkedToday();
    this.trackService.getWorkedInProjectsOnDay(new Date()).then((timesPerProject) => {
      this.timesPerProject = timesPerProject;
    });
  }

  switchTrackUntilNow(doTrackUntilNow: boolean) {
    this.doTrackUntilNow = doTrackUntilNow;
    if (doTrackUntilNow) {
      this.trackForm.get('end')?.setValue(null);
    } else {
      this.trackForm.get('end')?.setValue(new Date());
    }

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
