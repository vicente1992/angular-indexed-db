import { inject, Injectable } from '@angular/core';
import { Person } from './person';
import { Observable } from 'rxjs';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  private readonly STORE_NAME = 'people';
  #dbService = inject(NgxIndexedDBService);


  getAll(): Observable<Person[]> {
    return this.#dbService.getAll<Person>(this.STORE_NAME);
  }

  add(person: Person): Observable<any> {
    return this.#dbService.add<any>(this.STORE_NAME, person);
  }

  bulkAdd(people: Person[]): Observable<number[]> {
    return this.#dbService.bulkAdd<Person>(this.STORE_NAME, people);
  }

  update(person: Person): Observable<Person> {
    return this.#dbService.update<Person>(this.STORE_NAME, person);
  }

  delete(id: number): Observable<boolean> {
    return this.#dbService.deleteByKey(this.STORE_NAME, id);
  }

  clear(): Observable<boolean> {
    return this.#dbService.clear(this.STORE_NAME);
  }

}
