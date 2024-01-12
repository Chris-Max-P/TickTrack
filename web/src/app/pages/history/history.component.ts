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

  timesPerProjectHistory: Map<string, {worked: number, comments: string}>[] = [];

  constructor(public trackService: TrackService,
              private dateService: DateService) {
    for (let workday of this.dateService.getWorkDaysOfCurrentWeek()) {
      this.trackService.getWorkedInProjectsOnDay(workday).then((timesPerProject) => {
        this.timesPerProjectHistory.push(timesPerProject);
      });
    }

  }
}
