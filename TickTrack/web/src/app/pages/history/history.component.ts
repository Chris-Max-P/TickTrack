import { Component } from '@angular/core';
import {AppRoutes} from "@app-logic/enums/app-routes.enum";
import {TrackService} from "@data-logic/services/track.service";
import {DateService} from "@app-logic/services/date.service";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent {
  protected readonly AppRoutes = AppRoutes;

  weekday = new Date();
  timesPerProjectHistory: Map<string, {worked: number, comments: string}>[] = [];

  constructor(public trackService: TrackService,
              private dateService: DateService) {
    this.getWorkedTimes();
  }

  getWorkedTimes() {
    this.timesPerProjectHistory = [];
    for (let workday of this.dateService.getWorkDaysOfWeek(this.weekday)) {
      this.trackService.getWorkedInProjectsOnDay(workday).then((timesPerProject) => {
        this.timesPerProjectHistory.push(timesPerProject);
      });
    }
  }

  changeWeek(changeByWeeks: number) {
    let changeBy = changeByWeeks * 7;
    this.weekday.setDate(this.weekday.getDate() + changeBy);
    this.getWorkedTimes();
  }
}
