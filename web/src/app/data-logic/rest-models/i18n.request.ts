import {RestRequestEnum} from "@app-logic/enums/rest-request.enum";
import {RestRequest} from "@app-logic/models/rest-request.model";

export class I18nRequest extends RestRequest {

  keys: string[];
  constructor(keys: string[]) {
    super(RestRequestEnum.EXAMPLE);
    this.keys = keys;
  }
}
