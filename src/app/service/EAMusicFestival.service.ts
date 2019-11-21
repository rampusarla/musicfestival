import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable()
export class EAMusicFestivalService {
  constructor(public http: HttpClient) {}

  getData(): Observable<any> {
    return this.http
      .get("/api/v1/festivals")
      .pipe(
        catchError(err => {
          console.log("Handling error locally and rethrowing it...", err);
          return [{ suggestion: "No data retrieved.." }];
        })
      )
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
}
