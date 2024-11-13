import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { tap } from 'rxjs';
import { Person } from './person';
import { PeopleService } from './People.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'angular-ngx-indexed-db';

  people: any[] = [];
  peoples = signal<Person[]>([]);


  constructor(private peopleService: PeopleService) {

  }

  ngOnInit() {
    this.#loadPeople();
  }

  addPersonWithTap() {
    const newPerson: Person = {
      name: `Bob Smith ${Math.random() * 10}`,
      email: `bob${Math.random() * 10}@example.com`
    };

    this.peopleService.add(newPerson)
      .pipe(tap(() => this.#loadPeople()))
      .subscribe((res) => {
        console.log(res);
      });
  }

  updatePerson(person: Person) {
    const body = {
      ...person,
      name: `${person.name}!!`,
      email: `${person.email}!!`
    }
    this.peopleService.update(body).subscribe((res) => {
      console.log(res);
      this.#loadPeople();
    })
  }
  deletePerson(id: any) {
    this.peopleService.delete(id)
      .subscribe((res) => {
        console.log('res------->', res);
        this.#loadPeople()
      })
  }

  #loadPeople() {
    this.peopleService.getAll()
      .pipe(
        tap((result: Person[]) => this.peoples.set(result))
      )
      .subscribe();
  }


}
