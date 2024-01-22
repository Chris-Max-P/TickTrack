import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  getWorkDaysOfWeek(date: Date): Date[] {
    const first = date.getDate() - date.getDay() + 1;
    const workdays: Date[] = [];

    for (let i = 0; i < 5; i++) {
      workdays.push(new Date(date.setDate(first + i)));
    }

    return workdays;
  }
}
