import { NgxIndexedDBService } from "ngx-indexed-db";
import { IRepository } from "../interfaces/repository";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GenericRepository<T extends { id?: number }> implements IRepository<T> {

  protected storeName!: string
  #dbService = inject(NgxIndexedDBService);

  getAll(): Observable<T[]> {
    return this.#dbService.getAll<T>(this.storeName);
  }

  add(item: T): Observable<any> {
    return this.#dbService.add<any>(this.storeName, item);
  }

  bulkAdd(items: T[]): Observable<number[]> {
    return this.#dbService.bulkAdd<T>(this.storeName, items);
  }

  update(item: T): Observable<T> {
    return this.#dbService.update<T>(this.storeName, item);
  }

  delete(id: number): Observable<boolean> {
    return this.#dbService.deleteByKey(this.storeName, id);
  }

  clear(): Observable<boolean> {
    return this.#dbService.clear(this.storeName);
  }

  bulkDelete(ids: number[]): Observable<number[]> {
    return this.#dbService.bulkDelete(this.storeName, ids);
  }
}