export class Track {
  task?: string; //TODO
  comment?: string;
  role?: string; // TODO

  constructor(public begin: Date,
              public end: Date,
              public workedSeconds: number,
              public project: string) {
  }
}
