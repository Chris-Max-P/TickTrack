import {Track} from "@data-logic/models/track.model";

export interface IElectronAPI {
  closeApp: () => Promise<void>;
  log: (message: string, logLevel: LogLevel) => Promise<void>;

  trackTime: (data: Track) => Promise<void>;
  readTrackedTimes: (date: Date) => Promise<Track[]>;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}

export enum LogLevel { //TODO import angular app and take from there: logger.service.ts
  Debug,
  Info,
  Warn,
  Trace,
  Error,
  Fatal,
  Time,
  TimeEnd
}
