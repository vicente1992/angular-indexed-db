import { Injectable } from "@angular/core";
import { Person } from "../person";
import { GenericRepository } from "./generic-repository";

@Injectable({
  providedIn: 'root',
})
export class PeopleRepository extends GenericRepository<Person> {
  protected override storeName = 'people';
}