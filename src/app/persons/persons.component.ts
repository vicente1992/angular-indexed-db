import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { tap } from 'rxjs';
import { PeopleService } from '../People.service';
import { Person } from '../person';

@Component({
  selector: 'app-persons',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './persons.component.html',
  styleUrl: './persons.component.scss',
})
export class PersonsComponent implements OnInit {
  peoples = signal<Person[]>([]);
  #peopleService = inject(PeopleService);

  ngOnInit() {
    this.#loadPeople();
  }

  addPersonWithTap() {
    const newPerson: Person = this.#createRandomPerson();
    this.#peopleService.add(newPerson)
      .pipe(tap(() => this.#loadPeople()))
      .subscribe();
  }

  updatePerson(person: Person) {
    const body = {
      ...person,
      name: `${person.name}!!`,
      email: `${person.email}!!`
    }
    this.#peopleService.update(body)
      .subscribe(() => this.#loadPeople())
  }
  deletePerson(id: any) {
    this.#peopleService.delete(id)
      .subscribe(() => this.#loadPeople())
  }

  deleteAll() {
    const ids = this.peoples().map((person) => person.id!);
    this.#peopleService.bulkDelete(ids)
      .subscribe(() => this.#loadPeople())
  }

  #loadPeople() {
    this.#peopleService.getAll()
      .pipe(
        tap((result: Person[]) => this.peoples.set(result))
      )
      .subscribe();
  }

  #createRandomPerson(): Person {
    const randomId = Math.floor(Math.random() * 1000);
    return {
      name: `Bob Smith ${randomId}`,
      email: `bob${randomId}@example.com`,
    };
  }

}
