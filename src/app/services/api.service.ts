import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {ServerLinks} from '../app.enums';
import {Cow} from "../models/cows.model";

@Injectable({providedIn: "root"})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  public getCows(): Observable<Cow[]> {
    return this.httpClient.get<Cow[]>(ServerLinks.GET_COWS);
  }

  public deleteCow(id: number): Observable<Cow[]> {
    const httpOptions = {
      params: new HttpParams().append('id', id)
    };

    return this.httpClient.delete<Cow[]>(ServerLinks.DELETE_COW, httpOptions);
  }

  public createCow(cow: Cow): Observable<Cow[]> {
    return this.httpClient.post<Cow[]>(ServerLinks.CREATE_COW, cow);
  }

  public updateCow(cow: Cow): Observable<Cow[]> {
    return this.httpClient.put<Cow[]>(ServerLinks.UPDATE_COW, cow);
  }
}
