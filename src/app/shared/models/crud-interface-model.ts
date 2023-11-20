import { Observable } from "rxjs";

export interface crudI {
  get() : Observable<any[]>;

  create(product: any):Observable<any>;

  update(product: any):Observable<any>;

  delete(id: any):Observable<any>;
}
