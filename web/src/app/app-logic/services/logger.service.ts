import {Injectable} from '@angular/core';
import {environment} from "@environments/environment";

@Injectable({providedIn: 'root'})
export class LoggerService {
  private static log(message: string, logLevel: LogLevel, optionalParams: any): void {
    if (!environment.isConsoleLoggingEnabled) return;

    let logFunction: Function | undefined;
    switch (logLevel) {
      case LogLevel.Debug:
        logFunction = console.debug;
        break;
      case LogLevel.Info:
        logFunction = console.info;
        break;
      case LogLevel.Warn:
        logFunction = console.warn;
        break;
      case LogLevel.Error:
        logFunction = console.error;
        break;
      case LogLevel.Trace:
        logFunction = console.trace;
        break;
      case LogLevel.Time:
        logFunction = console.time;
        break;
      case LogLevel.TimeEnd:
        logFunction = console.timeEnd;
        break;
      default:
        logFunction = console.log;
    }
    logFunction(message, optionalParams);
  }

  static debug(msg: string, optionalParams: any = '') {
    this.log(msg, LogLevel.Debug, optionalParams);
  }

  static info(msg: string, optionalParams: any = '') {
    this.log(msg, LogLevel.Info, optionalParams);
  }

  static warn(msg: string, optionalParams: any = '') {
    this.log(msg, LogLevel.Warn, optionalParams);
  }

  static trace(msg: string, optionalParams: any = '') {
    this.log(msg, LogLevel.Trace, optionalParams);
  }

  static error(msg: string, optionalParams: any = '') {
    this.log(msg, LogLevel.Error,  optionalParams);
  }

  static fatal(msg: string, optionalParams: any = '') {
    this.log(msg, LogLevel.Fatal,  optionalParams);
  }

  static time(key: string) {
    this.log(key, LogLevel.Time, '');
  }

  static timeEnd(key: string) {
    this.log(key, LogLevel.TimeEnd, '');
  }

  static electronLog(msg: string, logLevel: LogLevel) {
    this.log(msg, logLevel, '');
  }
}

export enum LogLevel {
  Debug,
  Info,
  Warn,
  Trace,
  Error,
  Fatal,
  Time,
  TimeEnd
}
