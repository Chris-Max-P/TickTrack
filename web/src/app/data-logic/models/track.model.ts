export class Track {
  task?: string;
  comment?: string;

  constructor(public begin: Date,
              public end: Date,
              public workedSeconds: number,
              public project: string) {
  }
}
