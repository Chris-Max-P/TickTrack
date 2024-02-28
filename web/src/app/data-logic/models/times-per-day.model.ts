import {TimesPerProject} from "@data-logic/models/times-per-project.model";

export class TimesPerDay {
  constructor(public date: Date,
              public timesPerProject: TimesPerProject[],
              public totalHours: string) {
  }
}
