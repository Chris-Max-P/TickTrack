import {Track} from "./src/track.model";

export interface IElectronAPI {
  closeApp: () => Promise<void>;
  log: (message: string, logLevel: LogLevel) => Promise<void>;

  track: (data: Track) => Promise<void>;
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
