import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  trackedTimes: {start: Date, end: Date, project: string, comment?: string}[] = [];

  start?: Date;
  end?: Date;
  project?: string;
  comment?: string;

  projects = ["Mein Projekt", "Mein anderes Projekt", "Mein drittes Projekt"];

  ngOnInit() {
    this.initTracking();

    this.end = new Date();
    setTimeout(() => this.end = new Date(), 60000);
  }

  initTracking() {
    if (this.trackedTimes.length > 0) this.start = this.trackedTimes[this.trackedTimes.length - 1]?.end;
    else this.start = new Date();
  }

  track() {
    if (!this.end) this.end = new Date();
    this.trackedTimes.push({start: this.start!, end: this.end!, project: this.project!, comment: this.comment});
    this.start = this.end;
    this.end = new Date();
    this.comment = undefined;
  }

  dateFromTime(time: string) {
    const [hours, minutes] = time.split(':').map(Number);
    const currentDate = new Date();
    currentDate.setHours(hours);
    currentDate.setMinutes(minutes);
    return currentDate;
  }

  getTimeBetween(start: Date, end: Date) {
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

}
