import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  getWorkDaysOfCurrentWeek(): Date[] {
    const now = new Date();
    const first = now.getDate() - now.getDay() + 1;
    const workdays: Date[] = [];

    for (let i = 0; i < 5; i++) {
      workdays.push(new Date(now.setDate(first + i)));
    }

    return workdays;
  }
}
