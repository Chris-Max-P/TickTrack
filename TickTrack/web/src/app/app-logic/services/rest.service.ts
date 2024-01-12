import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "@environments/environment";
import {RestRequest} from "@app-logic/models/rest-request.model";

@Injectable({
  providedIn: 'root'
})
export class RestService {

  apiUrl = environment.contextPath + environment.apiUrl;

  headers = {
  };

  constructor(private http: HttpClient) {
  }

  post(restRequestObject: RestRequest) {
    return this.http.post(this.apiUrl, this.filterEmptyAttributes(restRequestObject), {'headers': this.headers});
  }

  filterEmptyAttributes(object: any) {
    return JSON.parse(JSON.stringify(
      object, (key, value) => {
        if (value) return value
      }
    ));
  }

}
