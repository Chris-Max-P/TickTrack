import { Component } from '@angular/core';
import {AppRoutes} from "@app-logic/enums/app-routes.enum";
import {TrackService} from "@data-logic/services/track.service";
import {DateService} from "@app-logic/services/date.service";
import {LoggerService} from "@app-logic/services/logger.service";
import {TimesPerProject} from "@data-logic/models/times-per-project.model";
import {TimesPerDay} from "@data-logic/models/times-per-day.model";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent {
  protected readonly AppRoutes = AppRoutes;

  weekday = new Date();
  timesPerDays: TimesPerDay[] = [];
  // timesPerProjectPerDayHistory: Map<string, {worked: number, comments: string}>[] = [];
  numberOfDaysDisplayed = 7;

  constructor(public trackService: TrackService) {
    this.getWorkedTimes();
  }

  getWorkedTimes() {
    this.timesPerDays = [];
    for (let i = 0; i < this.numberOfDaysDisplayed; i++) {
      let date = new Date(this.weekday);
      date.setDate(date.getDate() - i);

      this.trackService.getWorkedInProjectsOnDay(date).then((timesPerProject) => {
        let totalSeconds = timesPerProject.reduce((a, b) => a + b.worked, 0);
        let workedTimeString = this.trackService.getWorkedTimeString(totalSeconds);
        this.timesPerDays.push(new TimesPerDay(date, timesPerProject, workedTimeString));
      });
    }
    LoggerService.debug('Got worked times for week of: ' + this.weekday.toDateString());
  }

  changeWeek(changeByWeeks: number) {
    let changeBy = changeByWeeks * 7;
    this.weekday.setDate(this.weekday.getDate() + changeBy);
    LoggerService.debug('Changed weekday to: ' + this.weekday.toDateString());
    this.getWorkedTimes();
  }
}
