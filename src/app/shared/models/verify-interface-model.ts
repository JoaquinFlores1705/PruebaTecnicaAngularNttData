import { Observable } from "rxjs";

export interface verifyI {
  verify(id: any) : Observable<any>;
}
