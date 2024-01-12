import {EventEmitter, Injectable} from "@angular/core";

@Injectable({providedIn: 'root' })
export class ImportService {

  importSuccess$ = new EventEmitter();
  importError$ = new EventEmitter();

}
