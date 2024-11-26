import { Observable } from "rxjs";

export interface IRepository<T> {

  getAll(): Observable<T[]>;

  add(item: T): Observable<any>;

  bulkAdd(items: T[]): Observable<number[]>;

  update(item: T): Observable<T>;

  delete(id: number): Observable<boolean>;

  clear(): Observable<boolean>;

  bulkDelete(ids: number[]): Observable<number[]>;
}