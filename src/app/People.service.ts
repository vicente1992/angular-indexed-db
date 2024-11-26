import { inject, Injectable } from '@angular/core';
import { Person } from './person';
import { Observable } from 'rxjs';
import { PeopleRepository } from './repositories/people.repository';

@Injectable({
  providedIn: 'root'
})
export class PeopleService { 
  #repository = inject(PeopleRepository);

  getAll(): Observable<Person[]> {
    return this.#repository.getAll(); 
  }

  add(person: Person): Observable<any> { 
    return this.#repository.add(person);
  }

  bulkAdd(people: Person[]): Observable<number[]> { 
    return this.#repository.bulkAdd(people);
  }

  update(person: Person): Observable<Person> { 
    return this.#repository.update(person);
  }

  delete(id: number): Observable<boolean> { 
    return this.#repository.delete(id);
  }

  bulkDelete(ids: number[]): Observable<number[]> {
    return this.#repository.bulkDelete(ids);
  }

  clear(): Observable<boolean> { 
    return this.#repository.clear();
  }

}
