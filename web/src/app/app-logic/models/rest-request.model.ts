import {environment} from "@environments/environment";
import {v4 as uuidv4} from "uuid";

export abstract class RestRequest {

  protected correlationString: string;
  protected version: string;
  protected constructor(protected requestType: string) {
    this.correlationString = uuidv4();
    this.version = environment.restVersion;
  }

}
